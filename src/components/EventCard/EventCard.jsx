import React from 'react';
import { Calendar, MapPin, ShieldCheck, Users, Clock } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Reusable Event Details & Rules Card Component
 */
export const EventCard = ({
  eventName = 'Grand Thiruvonam Mega Lucky Draw 2026',
  date = '2026-08-28T17:00:00+05:30',
  venue = 'Kochi International Convention Centre, Kerala',
  organizer = 'Government Approved Festival Committee',
  totalSeats = '100,000 Tickets Maximum',
  className,
}) => {
  return (
    <div className={cn('bg-white rounded-[2rem] p-8 text-slate-800 space-y-6 border border-amber-200/80 shadow-soft', className)}>
      <div className="flex items-center gap-4 border-b border-amber-100 pb-5">
        <div className="p-3.5 bg-[#0F5132]/10 rounded-2xl text-[#0F5132] border border-[#0F5132]/20">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-black text-[#D4A017] tracking-widest font-heading">OFFICIAL EVENT</span>
          <h4 className="text-xl font-bold text-[#0F5132] font-heading">{eventName}</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFF9F0] border border-amber-100">
          <Clock className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-500 block font-semibold">Draw Date & Time</span>
            <span className="font-bold text-slate-800 text-sm">{formatDate(date)}</span>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFF9F0] border border-amber-100">
          <MapPin className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-500 block font-semibold">Live Draw Location</span>
            <span className="font-bold text-slate-800 text-sm">{venue}</span>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFF9F0] border border-amber-100">
          <ShieldCheck className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-500 block font-semibold">Organizer & Auditing</span>
            <span className="font-bold text-slate-800 text-sm">{organizer}</span>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFF9F0] border border-amber-100">
          <Users className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-500 block font-semibold">Ticket Pool</span>
            <span className="font-bold text-slate-800 text-sm">{totalSeats}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
