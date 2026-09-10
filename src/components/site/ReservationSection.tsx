import { useState, useRef } from "react";
import { MessageCircle, Phone, Calendar, Clock, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { DAWAT_INFO } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

export function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: "2",
    message: "",
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: y * -4, y: x * 4 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();

    let text = "Hello Get To Gether Restaurant, I would like to book a table.";

    if (formData.name.trim()) {
      text += `\nName: ${formData.name}`;
    }
    if (formData.phone.trim()) {
      text += `\nPhone: ${formData.phone}`;
    }
    if (formData.date) {
      text += `\nDate: ${formData.date}`;
    }
    if (formData.time) {
      text += `\nTime: ${formData.time}`;
    }
    if (formData.guests) {
      text += `\nGuests: ${formData.guests} people`;
    }
    if (formData.message.trim()) {
      text += `\nSpecial Request: ${formData.message}`;
    }

    const waUrl = `https://wa.me/919988604160?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section id="reservation" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B88952]/40 bg-[#2A1D14]/80 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(184,137,82,0.15)]">
                <Sparkles className="size-3.5 text-[#D8B477]" />
                <span className="font-gurmukhi text-xs font-semibold text-[#D8B477]">ਟੇਬਲ ਬੁਕਿੰਗ</span>
                <span className="text-[#B88952] text-xs">&bull;</span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#F3E8D2]">
                  VIP RESERVATIONS &bull; GURDASPUR
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FFF9EF]">
                Book Your Table at Get To Gether
              </h2>
              <span className="font-gurmukhi text-xl sm:text-2xl text-[#D8B477] font-medium block mt-1.5">
                ਆਪਣਾ ਟੇਬਲ ਬੁੱਕ ਕਰੋ &bull; ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ
              </span>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 text-xs sm:text-sm text-[#D3C4AF] max-w-xl mx-auto leading-relaxed font-light">
                Family dinners, gatherings, or intimate candlelight dinners — reserve directly over WhatsApp with instant confirmation from our team.
              </p>
            </Reveal>
          </div>

          {/* 3D Elevated Glass Form Container */}
          <Reveal delay={260} className="mt-12 perspective-1200 preserve-3d">
            <div
              ref={cardRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`,
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
              }}
              className="p-6 sm:p-10 rounded-2xl border border-[#B88952]/30 bg-[#2A1D14]/90 backdrop-blur-xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(184,137,82,0.15)] will-change-transform preserve-3d"
            >
              <form onSubmit={handleWhatsAppBooking} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#D8B477] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Gurpreet Singh"
                      className="w-full rounded-xl border border-[#B88952]/30 bg-[#17110C]/90 px-4 py-3 text-sm text-[#FFF9EF] placeholder:text-[#D3C4AF]/60 focus:border-[#D8B477] focus:outline-none focus:ring-1 focus:ring-[#D8B477] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D6A84F] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 99886 04160"
                      className="w-full rounded-xl border border-[#D6A84F]/25 bg-[#0E1110] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-[#A9A59B]/60 focus:border-[#D6A84F] focus:outline-none focus:ring-1 focus:ring-[#D6A84F] transition-colors"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D6A84F] mb-2">
                      Date of Visit
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-[#D6A84F]/25 bg-[#0E1110] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-[#A9A59B]/60 focus:border-[#D6A84F] focus:outline-none focus:ring-1 focus:ring-[#D6A84F] [color-scheme:dark] transition-colors"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D6A84F] mb-2">
                      Preferred Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full rounded-xl border border-[#D6A84F]/25 bg-[#0E1110] px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#D6A84F] focus:outline-none focus:ring-1 focus:ring-[#D6A84F] [color-scheme:dark] transition-colors"
                    >
                      <option value="11:30">11:30 AM (Lunch)</option>
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="14:30">02:30 PM (Afternoon)</option>
                      <option value="17:00">05:00 PM (Evening Snacks &amp; Coffee)</option>
                      <option value="18:30">06:30 PM (Early Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner &amp; Lounge)</option>
                      <option value="21:30">09:30 PM (Late Dinner)</option>
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D6A84F] mb-2">
                      Number of Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full rounded-xl border border-[#D6A84F]/25 bg-[#0E1110] px-4 py-3 text-sm text-[#F5F1E8] focus:border-[#D6A84F] focus:outline-none focus:ring-1 focus:ring-[#D6A84F] [color-scheme:dark] transition-colors"
                    >
                      <option value="1-2">1 – 2 People</option>
                      <option value="3-4">3 – 4 People (Family/Friends)</option>
                      <option value="5-8">5 – 8 People (Group Dinner)</option>
                      <option value="9-15">9 – 15 People (Party Table)</option>
                      <option value="16-30">16 – 30+ People (Banquet Party Hall)</option>
                    </select>
                  </div>

                  {/* Special Message */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D6A84F] mb-2">
                      Occasion / Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Birthday celebration, bamboo garden request"
                      className="w-full rounded-xl border border-[#D6A84F]/25 bg-[#0E1110] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-[#A9A59B]/60 focus:border-[#D6A84F] focus:outline-none focus:ring-1 focus:ring-[#D6A84F] transition-colors"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D6A84F]/15">
                  <div className="flex items-center gap-2 text-xs text-[#A9A59B]">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp confirmation with restaurant management</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* Call Now */}
                    <a
                      href={DAWAT_INFO.phoneHref}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-[#D6A84F]/35 bg-[#151A18] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F5F1E8] hover:bg-[#18201C] hover:border-[#D6A84F] transition active:scale-95"
                    >
                      <Phone className="size-3.5 text-[#D8B477]" />
                      <span>Call Now</span>
                    </a>

                    {/* Book via WhatsApp */}
                    <button
                      type="submit"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#B88952] to-[#D8B477] hover:from-[#D8B477] hover:to-[#B88952] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#17110C] shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_20px_rgba(184,137,82,0.35)] transition-all hover:scale-105 active:scale-95"
                    >
                      <MessageCircle className="size-4 text-[#17110C]" />
                      <span>ਵਟਸਐਪ &apos;ਤੇ ਬੁੱਕ ਕਰੋ &bull; Reserve on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
