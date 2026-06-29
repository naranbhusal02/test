"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { X, Calendar, Clock, User, Check, ArrowLeft, Scissors, Coffee, ShoppingBag, GraduationCap, Sparkles } from "lucide-react";

interface BookingOptions {
  department: string;
  service: string;
}

interface BookingContextType {
  isOpen: boolean;
  preselectedDept: string;
  preselectedService: string;
  openBooking: (dept?: string, service?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedDept, setPreselectedDept] = useState("");
  const [preselectedService, setPreselectedService] = useState("");

  const openBooking = (dept = "", service = "") => {
    setPreselectedDept(dept);
    setPreselectedService(service);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent body scroll
  };

  const closeBooking = () => {
    setIsOpen(false);
    setPreselectedDept("");
    setPreselectedService("");
    document.body.style.overflow = "unset";
  };

  return (
    <BookingContext.Provider value={{ isOpen, preselectedDept, preselectedService, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

const serviceDirectory = [
  {
    dept: "Salon",
    icon: Scissors,
    services: ["Classic Haircut", "Signature Beard Trim", "Hot Towel Shave"],
  },
  {
    dept: "Cafe",
    icon: Coffee,
    services: ["Specialty Coffee Tasting", "Business Lounge Table", "High Tea Reservation"],
  },
  {
    dept: "Man Store",
    icon: ShoppingBag,
    services: ["Bespoke Tailoring Consult", "Personal Styling Session", "Grooming Consultation"],
  },
  {
    dept: "Academy",
    icon: GraduationCap,
    services: ["Leadership Mastery cohort", "Personal Brand & Style cohort"],
  },
];

const timeSlots = [
  "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM", "08:30 PM"
];

export const BookingWizard: React.FC = () => {
  const { isOpen, preselectedDept, preselectedService, closeBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Booking Form State
  const [department, setDepartment] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  // Sync pre-selected state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError("");
      setReferenceCode("");
      
      if (preselectedDept) {
        setDepartment(preselectedDept);
        if (preselectedService) {
          setService(preselectedService);
          setStep(2); // Jump to date/time if service is preselected
        }
      } else {
        setDepartment("");
        setService("");
      }
      // Reset details
      setDate("");
      setTime("");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
    }
  }, [isOpen, preselectedDept, preselectedService]);

  if (!isOpen) return null;

  const handleServiceSelect = (dept: string, serv: string) => {
    setDepartment(dept);
    setService(serv);
    setStep(2);
  };

  const handleDateTimeNext = () => {
    if (!date || !time) {
      setError("Please choose a date and select a time slot.");
      return;
    }
    setError("");
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please fill out all contact information fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          notes,
          department,
          service,
          date,
          time,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReferenceCode(data.booking.reference_id);
        setStep(4);
      } else {
        setError(data.error || "Failed to finalize booking.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#181818] border border-gold/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-gold w-4 h-4" />
            <h3 className="font-serif text-lg text-cream font-medium tracking-wide">
              {step === 4 ? "Booking Confirmed" : "Book An Experience"}
            </h3>
          </div>
          <button 
            onClick={closeBooking}
            className="text-cream/50 hover:text-gold transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error alert banner */}
        {error && (
          <div className="px-6 py-3 bg-red-900/30 border-b border-red-500/20 text-red-200 text-xs font-sans tracking-wide">
            {error}
          </div>
        )}

        {/* Step Indicator */}
        {step < 4 && (
          <div className="bg-[#121212] px-6 py-3 border-b border-gold/5 flex justify-between items-center text-[10px] tracking-widest font-sans text-cream/40 uppercase">
            <span>Step {step} of 3</span>
            <div className="flex gap-1">
              <div className={`w-6 h-1 rounded-full ${step >= 1 ? "bg-gold" : "bg-white/10"}`} />
              <div className={`w-6 h-1 rounded-full ${step >= 2 ? "bg-gold" : "bg-white/10"}`} />
              <div className={`w-6 h-1 rounded-full ${step >= 3 ? "bg-gold" : "bg-white/10"}`} />
            </div>
          </div>
        )}

        {/* Step Contents - Scrollable body */}
        <div className="p-6 overflow-y-auto flex-1 font-sans">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <p className="text-cream/60 text-xs uppercase tracking-wider mb-2">Select a Service Offering</p>
              <div className="space-y-4">
                {serviceDirectory.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.dept} className="space-y-2">
                      <div className="flex items-center gap-2 text-gold font-serif text-sm tracking-widest uppercase border-b border-white/5 pb-1">
                        <Icon className="w-4 h-4 text-gold/60" />
                        <span>{category.dept}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {category.services.map((serv) => (
                          <button
                            key={serv}
                            onClick={() => handleServiceSelect(category.dept, serv)}
                            className="text-left px-4 py-3 bg-[#121212] border border-white/5 hover:border-gold/30 rounded-lg text-cream/80 hover:text-cream text-xs transition-all duration-300 flex items-center justify-between group"
                          >
                            <span>{serv}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-gold/30 group-hover:text-gold transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECT */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Back Button */}
              <button 
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-gold text-[10px] tracking-widest uppercase hover:underline"
              >
                <ArrowLeft size={10} /> Back to services
              </button>

              <div className="bg-[#121212] p-4 rounded-xl border border-white/5">
                <span className="text-[10px] text-gold/60 tracking-widest uppercase block mb-1">Selected</span>
                <p className="font-serif text-cream text-base font-light">{service} ({department})</p>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-cream/60 text-xs uppercase tracking-wider block">Choose Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg py-3 px-4 text-cream text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-3">
                <label className="text-cream/60 text-xs uppercase tracking-wider block">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2.5 rounded-lg border text-xs tracking-wider font-medium transition-all duration-300 ${
                        time === slot
                          ? "bg-gold border-gold text-[#121212]"
                          : "bg-[#121212] border-white/5 text-cream/70 hover:border-gold/30"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation button */}
              <button
                onClick={handleDateTimeNext}
                className="w-full mt-6 py-3.5 bg-gold text-[#121212] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors duration-300"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 3: CONTACT FORM */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Back Button */}
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-gold text-[10px] tracking-widest uppercase hover:underline"
              >
                <ArrowLeft size={10} /> Back to Scheduler
              </button>

              <div className="bg-[#121212] p-4 rounded-xl border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between text-cream/40">
                  <span>SERVICE</span>
                  <span>DATE & TIME</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-serif text-cream text-sm font-light">{service}</span>
                  <span className="text-gold text-right">{date} @ {time}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-cream/60 text-[10px] uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    placeholder="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg py-2.5 px-4 text-cream text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-cream/60 text-[10px] uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg py-2.5 px-4 text-cream text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-cream/60 text-[10px] uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      placeholder="+977 98XXXXXXX"
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 rounded-lg py-2.5 px-4 text-cream text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-cream/60 text-[10px] uppercase tracking-wider block">Special Requests (Optional)</label>
                  <textarea
                    rows={3}
                    value={notes}
                    placeholder="Any styling preferences, dietary needs, or tailoring measurements..."
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg py-2.5 px-4 text-cream text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 bg-gold text-[#121212] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#121212] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Request Booking</span>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: SUCCESS / CONFIRMATION */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="text-gold w-8 h-8" />
              </div>
              
              <div>
                <h4 className="font-serif text-2xl text-cream font-light">Booking Requested</h4>
                <p className="text-cream/50 text-xs font-sans tracking-wide mt-2">
                  We have received your reservation request and are verifying scheduling availability.
                </p>
              </div>

              <div className="bg-[#121212] border border-gold/10 rounded-xl p-5 max-w-sm mx-auto space-y-4">
                <div>
                  <span className="text-[9px] text-cream/40 uppercase tracking-widest block">Booking Code</span>
                  <span className="font-serif text-2xl text-gold font-semibold tracking-widest">{referenceCode}</span>
                </div>
                <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-[8px] text-cream/40 uppercase tracking-wider block">Service</span>
                    <span className="text-cream/80">{service}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-cream/40 uppercase tracking-wider block">Scheduled</span>
                    <span className="text-cream/80">{date} @ {time}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-cream/40 leading-relaxed font-sans max-w-xs mx-auto">
                An email notification has been dispatched to <span className="text-cream/70 font-semibold">{email}</span>. Please keep this code for reference.
              </p>

              <button
                onClick={closeBooking}
                className="px-8 py-3 border border-gold/30 text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-[#121212] transition-all duration-300 font-semibold"
              >
                Close Window
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
