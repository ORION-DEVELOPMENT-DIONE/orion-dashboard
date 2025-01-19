import React from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { UserMenu } from "./navbar/UserMenu";
import { AuthButtons } from "./navbar/AuthButtons";
import { MobileMenuButton } from "./navbar/MobileMenuButton";
import Navbar from "./Navbar";
interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 relative">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 bg-opacity-90 shadow-xl z-50 pt-16">
        <Sidebar />
      </div>

      {/* Navbar */}
      <Navbar></Navbar>
      

      {/* User Menu / Auth Buttons */}
      

      {/* Main Content */}
      <main className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] mix-blend-overlay opacity-20 pointer-events-none"></div>
      <div
        className="fixed inset-0 bg-gradient-to-b from-transparent to-purple-900/50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      ></div>
    </div>
  );
}
