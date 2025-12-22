import { motion } from "framer-motion";
import { ShieldCheck, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Logo & Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-xl font-bold">
            <ShieldCheck className="text-indigo-500" />
            VendorTrust
          </div>
          <p className="text-slate-400 text-sm">
            Helping Nigerians avoid online scams with AI + local insights.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-green-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <a href="/" className="text-slate-400 hover:text-white transition">Home</a>
          <a href="/check" className="text-slate-400 hover:text-white transition">Check Vendor</a>
          <a href="/dashboard" className="text-slate-400 hover:text-white transition">Dashboard</a>
          <a href="/login" className="text-slate-400 hover:text-white transition">Login</a>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <h3 className="font-semibold mb-2">Resources</h3>
          <a href="#" className="text-slate-400 hover:text-white transition">Tips & Guides</a>
          <a href="#" className="text-slate-400 hover:text-white transition">FAQ</a>
          <a href="#" className="text-slate-400 hover:text-white transition">Blog</a>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-semibold mb-2">Subscribe</h3>
          <p className="text-slate-400 text-sm">
            Get updates on the latest vendor safety tips.
          </p>
          <form className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 px-3 py-2 rounded-lg text-slate-900 focus:outline-none"
            />
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      <div className="mt-10 border-t border-slate-700 pt-6 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} VendorTrust. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
