using System;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace SagaDiorama
{
    static class Program
    {
        public static void Quit() { Application.Exit(); }

        [DllImport("user32.dll")] static extern bool SetProcessDpiAwarenessContext(IntPtr v);
        [DllImport("user32.dll")] static extern bool SetProcessDPIAware();
        static void MakeDpiAware()
        {
            try { if (SetProcessDpiAwarenessContext(new IntPtr(-4))) return; } catch (Exception) { }
            try { SetProcessDPIAware(); } catch (Exception) { }
        }

        [STAThread]
        static void Main(string[] args)
        {
            string a = args.Length > 0 ? args[0].Trim().ToLowerInvariant() : "/c";
            if (a.Length > 2 && (a[0] == '/' || a[0] == '-') && a[2] == ':') a = a.Substring(0, 2);
            if (a.StartsWith("-")) a = "/" + a.Substring(1);

            MakeDpiAware();
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            if (a == "/s") { RunSaver(); return; }
            if (a == "/p") { return; } // preview pane: intentionally blank
            ShowConfig();
        }

        static void ShowConfig()
        {
            string rt;
            try { rt = CoreWebView2Environment.GetAvailableBrowserVersionString(); }
            catch (Exception) { rt = null; }
            string msg = "Saga Diorama - nine saga duels, seamless loop.\n\nThere are no settings.\n" +
                         "Set the idle time in Windows Settings > Personalization > Lock screen > Screen saver.\n\n" +
                         (rt != null ? "WebView2 runtime detected: " + rt
                                     : "WARNING: Microsoft Edge WebView2 Runtime was not found.\nInstall it from https://go.microsoft.com/fwlink/p/?LinkId=2124703");
            MessageBox.Show(msg, "Saga Diorama", MessageBoxButtons.OK, rt != null ? MessageBoxIcon.Information : MessageBoxIcon.Warning);
        }

        static void RunSaver()
        {
            Form primary = null;
            foreach (Screen s in Screen.AllScreens)
            {
                Form f;
                if (s.Primary) { f = new SaverForm(s.Bounds); primary = f; }
                else f = new BlackForm(s.Bounds);
                f.Show();
            }
            if (primary == null) return;
            Cursor.Hide();
            Application.Run();   // ends via Program.Quit()
            Cursor.Show();
        }
    }

    class BlackForm : Form
    {
        Point last = Point.Empty; DateTime born = DateTime.UtcNow;
        public BlackForm(Rectangle b)
        {
            FormBorderStyle = FormBorderStyle.None; StartPosition = FormStartPosition.Manual;
            Bounds = b; BackColor = Color.Black; TopMost = true; ShowInTaskbar = false;
            KeyPreview = true;
            KeyDown += delegate { Program.Quit(); };
            MouseDown += delegate { Program.Quit(); };
            MouseMove += delegate (object s, MouseEventArgs e)
            {
                if ((DateTime.UtcNow - born).TotalMilliseconds < 1500) return;
                if (last == Point.Empty) { last = e.Location; return; }
                if (Math.Abs(e.X - last.X) + Math.Abs(e.Y - last.Y) > 12) Program.Quit();
            };
        }
    }

    class SaverForm : BlackForm
    {
        WebView2 wv;
        const string JS = @"(function(){var t=Date.now(),x0=-1,y0=-1;
function q(){try{window.chrome.webview.postMessage('q')}catch(e){}}
addEventListener('keydown',q,true);addEventListener('mousedown',q,true);addEventListener('touchstart',q,true);addEventListener('wheel',q,true);
addEventListener('mousemove',function(e){if(Date.now()-t<1500)return;if(x0<0){x0=e.screenX;y0=e.screenY;return}if(Math.abs(e.screenX-x0)+Math.abs(e.screenY-y0)>12)q()},true);
document.addEventListener('DOMContentLoaded',function(){var s=document.createElement('style');s.textContent='*{cursor:none!important}';document.head.appendChild(s)});})();";

        public SaverForm(Rectangle b) : base(b)
        {
            wv = new WebView2();
            wv.Dock = DockStyle.Fill;
            wv.DefaultBackgroundColor = Color.Black;
            Controls.Add(wv);
            Shown += delegate { Init(); };
        }

        async void Init()
        {
            try
            {
                string ud = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "SagaDiorama", "WebView2");
                CoreWebView2Environment env = await CoreWebView2Environment.CreateAsync(null, ud, null);
                await wv.EnsureCoreWebView2Async(env);
                CoreWebView2 cw = wv.CoreWebView2;
                cw.Settings.AreDefaultContextMenusEnabled = false;
                cw.Settings.AreDevToolsEnabled = false;
                cw.Settings.IsStatusBarEnabled = false;
                cw.Settings.IsZoomControlEnabled = false;
                cw.Settings.AreBrowserAcceleratorKeysEnabled = false;
                cw.Settings.IsPinchZoomEnabled = false;
                await cw.AddScriptToExecuteOnDocumentCreatedAsync(JS);
                cw.WebMessageReceived += delegate { Program.Quit(); };
                string html = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "diorama.html");
                cw.Navigate(new Uri(html).AbsoluteUri);
            }
            catch (Exception) { Program.Quit(); }
        }
    }
}
