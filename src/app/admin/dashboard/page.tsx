"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, LogOut, Search, Filter, Calendar, Clock, User, Phone, Mail, 
  Check, X, Trash2, Shield, AlertCircle 
} from "lucide-react";
import { Booking } from "@/lib/db";

// Helper to determine estimated revenue based on service price catalog
function getServicePrice(serviceName: string): number {
  const name = serviceName.toLowerCase();
  if (name.includes("haircut")) return 45;
  if (name.includes("beard")) return 35;
  if (name.includes("shave")) return 40;
  if (name.includes("coffee")) return 20;
  if (name.includes("lounge")) return 50;
  if (name.includes("tea")) return 30;
  if (name.includes("tailor") || name.includes("tailoring")) return 100;
  if (name.includes("styling")) return 75;
  if (name.includes("grooming consult")) return 50;
  if (name.includes("leadership")) return 850;
  if (name.includes("brand & style")) return 400;
  return 0; // Default or fallback
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Action loaders
  const [actionId, setActionId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.error || "Failed to load bookings database.");
      }
    } catch (err) {
      setError("Network error occurred while contacting database API.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusUpdate = async (id: string, newStatus: "Confirmed" | "Cancelled") => {
    setActionId(id);
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setBookings(prev => 
          prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      alert("Error contacting API.");
    } finally {
      setActionId("");
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking record?")) return;
    
    setActionId(id);
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b.id !== id));
      } else {
        alert("Failed to delete record.");
      }
    } catch (err) {
      alert("Error contacting API.");
    } finally {
      setActionId("");
      setActionLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      alert("Logout failed.");
    }
  };

  // KPIs Calculations
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "Pending").length,
    confirmed: bookings.filter(b => b.status === "Confirmed").length,
    projectedRevenue: bookings
      .filter(b => b.status === "Confirmed")
      .reduce((sum, b) => sum + getServicePrice(b.service), 0),
  };

  // Filtering Logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.reference_id.toLowerCase().includes(search.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      b.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      b.customer_phone.includes(search);

    const matchesDept = deptFilter === "All" || b.department === deptFilter;
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-[#121212] font-sans text-cream pb-12">
      
      {/* Top Navigation Bar */}
      <header className="bg-[#181818] border-b border-gold/10 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold">
            <Shield size={16} />
          </div>
          <div>
            <h1 className="font-serif text-sm tracking-widest uppercase font-semibold leading-none">Gentlemen's Room</h1>
            <span className="text-[9px] text-cream/40 tracking-[0.25em] uppercase font-bold">Admin Panel</span>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-3.5 py-1.5 border border-white/10 hover:border-gold hover:text-gold rounded text-[10px] tracking-widest uppercase font-semibold flex items-center gap-1.5 transition-colors duration-300"
        >
          <LogOut size={11} />
          Logout
        </button>
      </header>

      {/* Main Content Wrap */}
      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Alerts */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/20 text-red-200 text-sm rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* KPI Metrics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#181818] border border-white/5 rounded-xl p-5 space-y-1">
            <span className="text-[9px] text-cream/40 uppercase tracking-widest block font-bold">Total Requests</span>
            <p className="font-serif text-3xl text-cream font-light">{stats.total}</p>
          </div>
          <div className="bg-[#181818] border border-gold/25 rounded-xl p-5 space-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-gold/5 rounded-bl-full pointer-events-none" />
            <span className="text-[9px] text-gold/80 uppercase tracking-widest block font-bold">Pending Review</span>
            <p className="font-serif text-3xl text-gold font-light">{stats.pending}</p>
          </div>
          <div className="bg-[#181818] border border-white/5 rounded-xl p-5 space-y-1">
            <span className="text-[9px] text-cream/40 uppercase tracking-widest block font-bold">Confirmed Sessions</span>
            <p className="font-serif text-3xl text-cream font-light">{stats.confirmed}</p>
          </div>
          <div className="bg-[#181818] border border-white/5 rounded-xl p-5 space-y-1">
            <span className="text-[9px] text-cream/40 uppercase tracking-widest block font-bold">Projected Revenue</span>
            <p className="font-serif text-3xl text-gold font-semibold">${stats.projectedRevenue}</p>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="bg-[#181818] border border-white/5 rounded-xl p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={search}
                placeholder="Search code or customer..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-cream text-xs focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {/* Department Filters */}
            <div className="flex flex-wrap gap-1.5">
              {["All", "Salon", "Cafe", "Man Store", "Academy"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDeptFilter(dept)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                    deptFilter === dept 
                      ? "bg-gold border-gold text-[#121212]" 
                      : "bg-[#121212] border-white/5 text-cream/70 hover:border-gold/30"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-1.5">
              {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                    statusFilter === status 
                      ? "bg-gold border-gold text-[#121212]" 
                      : "bg-[#121212] border-white/5 text-cream/70 hover:border-gold/30"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Bookings List / Table */}
        <section className="bg-[#181818] border border-white/5 rounded-xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-16 text-center space-y-2">
              <span className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin inline-block" />
              <p className="text-xs text-cream/40 uppercase tracking-widest">Querying Bookings Database...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-16 text-center text-cream/30 space-y-1">
              <p className="font-serif text-lg font-light">No bookings found</p>
              <p className="text-[10px] uppercase tracking-wider">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#121212] border-b border-white/5 text-cream/40 uppercase tracking-widest text-[9px] font-semibold">
                    <th className="p-4 pl-6">Reference</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Scheduled Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-cream/80">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.01] transition-colors duration-200">
                      
                      {/* Code */}
                      <td className="p-4 pl-6 font-serif text-sm text-gold font-semibold tracking-widest">
                        {b.reference_id}
                      </td>

                      {/* Customer Info */}
                      <td className="p-4 space-y-1 max-w-[200px]">
                        <p className="font-medium text-cream text-xs">{b.customer_name}</p>
                        <div className="flex flex-col gap-0.5 text-[10px] text-cream/55">
                          <span className="flex items-center gap-1">
                            <Mail size={10} className="opacity-60" /> {b.customer_email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={10} className="opacity-60" /> {b.customer_phone}
                          </span>
                        </div>
                        {b.notes && (
                          <div className="bg-[#121212] border border-white/5 rounded p-2 text-[10px] text-gold/80 italic mt-1.5 max-h-20 overflow-y-auto">
                            "{b.notes}"
                          </div>
                        )}
                      </td>

                      {/* Service Info */}
                      <td className="p-4 space-y-0.5">
                        <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gold uppercase tracking-wider font-semibold border border-white/5">
                          {b.department}
                        </span>
                        <p className="text-cream text-xs font-medium mt-1">{b.service}</p>
                        <span className="text-[10px] text-cream/40 block">Est: ${getServicePrice(b.service)}</span>
                      </td>

                      {/* Date & Time */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-cream/85">
                          <Calendar size={11} className="text-gold/60" />
                          <span>{b.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-cream/50">
                          <Clock size={11} className="opacity-60" />
                          <span>{b.time}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 rounded text-[9px] tracking-wider uppercase font-semibold ${
                          b.status === "Confirmed"
                            ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-300"
                            : b.status === "Cancelled"
                            ? "bg-red-950/40 border border-red-500/20 text-red-300"
                            : "bg-yellow-950/40 border border-yellow-500/20 text-yellow-300"
                        }`}>
                          {b.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Confirm action */}
                          {b.status !== "Confirmed" && (
                            <button
                              disabled={actionLoading && actionId === b.id}
                              onClick={() => handleStatusUpdate(b.id, "Confirmed")}
                              title="Confirm Request"
                              className="w-7 h-7 rounded border border-[#22c55e]/20 text-[#22c55e] hover:bg-[#22c55e]/10 transition-colors flex items-center justify-center disabled:opacity-50"
                            >
                              <Check size={12} />
                            </button>
                          )}

                          {/* Cancel action */}
                          {b.status !== "Cancelled" && (
                            <button
                              disabled={actionLoading && actionId === b.id}
                              onClick={() => handleStatusUpdate(b.id, "Cancelled")}
                              title="Cancel Request"
                              className="w-7 h-7 rounded border border-[#ef4444]/20 text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors flex items-center justify-center disabled:opacity-50"
                            >
                              <X size={12} />
                            </button>
                          )}

                          {/* Delete action */}
                          <button
                            disabled={actionLoading && actionId === b.id}
                            onClick={() => handleDelete(b.id)}
                            title="Delete Record"
                            className="w-7 h-7 rounded border border-white/10 text-cream/40 hover:border-red-500 hover:text-red-400 hover:bg-red-500/5 transition-all flex items-center justify-center disabled:opacity-50"
                          >
                            <Trash2 size={12} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
