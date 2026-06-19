/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Booking, Inquiry } from '../types';
import { Calendar, Trash2, ShieldCheck, Mail, SlidersHorizontal, MapPin, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../utils';

interface UserDashboardProps {
  bookings: Booking[];
  inquiries: Inquiry[];
  onCancelBooking: (id: string) => void;
  onBookSession: () => void;
}

export default function UserDashboard({
  bookings,
  inquiries,
  onCancelBooking,
  onBookSession
}: UserDashboardProps) {
  return (
    <div className="animate-fade-in pt-6 md:pt-12">
      {/* Dashboard Brand Badge */}
      <div className="bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm border border-primary/20 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white font-hanken font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Account</span>
            </span>
          </div>
          <h1 className="font-rubik text-3xl font-bold tracking-tight">
            Greetings, Sanctuary Coordinator
          </h1>
          <p className="font-nunito text-neutral-100 text-sm md:text-base max-w-xl">
            Welcome to your MAXFMS portal. From here you can verify active deep clean runs, review quoted estimations, and manage inquiries.
          </p>
        </div>

        <button
          onClick={onBookSession}
          className="bg-white text-primary font-hanken font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-zinc-50 active:scale-95 transition-all shadow-xs scale-100 shrink-0 cursor-pointer"
        >
          Schedule New Clean
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
        
        {/* Core Bookings Columns: Left/Middle - span 2 */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white border border-border-soft rounded-xl p-6 md:p-8 shadow-xs">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5.5 h-5.5 text-primary" />
                <h2 className="font-rubik text-xl font-bold text-zinc-800">
                  Scheduled Cleanings ({bookings.length})
                </h2>
              </div>
              <span className="text-xs font-bold font-nunito text-zinc-400 capitalize">
                Offline Local Database
              </span>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="group border border-border-soft rounded-lg p-5 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative animate-fade-in"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-rubik font-bold text-base text-zinc-800">
                          {booking.serviceType}
                        </span>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {booking.status}
                        </span>
                        <span className="bg-zinc-150 text-zinc-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {booking.frequency}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 font-nunito text-sm text-zinc-550">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                          <span>{booking.date} at {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                          <span className="truncate">Active registered address coordinator</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
                          <SlidersHorizontal className="w-4 h-4 text-zinc-400 shrink-0" />
                          <span className="italic truncate max-w-sm">
                            {booking.specialRequirements || 'No special requirements noted'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-baseline md:items-end justify-between w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-zinc-100">
                      <div className="space-y-0.5 text-left md:text-right">
                        <span className="text-[11px] text-zinc-400 font-medium block">Invoice Est</span>
                        <span className="text-xl font-bold font-rubik text-primary">
                          {formatCurrency(booking.totalEstimatedPrice)}
                        </span>
                      </div>
                      
                      {/* Cancel Session button */}
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors md:mt-3 cursor-pointer"
                        title="Cancel appointment slot"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <AlertCircle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <h3 className="font-rubik text-lg font-bold text-zinc-700">No scheduled sessions</h3>
                <p className="font-nunito text-zinc-400 mt-1 max-w-sm mx-auto text-sm">
                  You do not have any upcoming visits slated. Press Schedule New Clean above to configure one!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side widgets: Inquiries Tracker - span 1 */}
        <div className="space-y-8">
          
          <div className="bg-white border border-border-soft rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-100">
              <Mail className="w-5 h-5 text-primary" />
              <h2 className="font-rubik text-lg font-bold text-zinc-800">
                Inquiries &amp; Tickets ({inquiries.length})
              </h2>
            </div>

            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="border border-border-soft rounded-lg p-4 bg-zinc-50/20 shadow-inner animate-fade-in text-sm font-nunito"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-zinc-800 truncate">{inq.serviceInterest}</span>
                      <span className="bg-blue-55 text-primary text-[9px] font-bold px-2 py-0.5 rounded border border-primary/20 uppercase">
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-zinc-500 line-clamp-3 text-xs leading-relaxed italic">
                      "{inq.message}"
                    </p>
                    <span className="text-[10px] text-zinc-400 mt-2 block">
                      Submitted on {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                
                <div className="p-3 bg-zinc-50 rounded-lg text-center text-xs text-zinc-400">
                  Coordination coordinators review and reply in 2 hours. Checks inbox!
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                <h3 className="font-rubik text-base font-bold text-zinc-600">No active tickets</h3>
                <p className="font-nunito text-zinc-400 text-xs mt-1 leading-relaxed">
                  Have questions about custom contracts? Fire away via the Contact Form and trace them live here!
                </p>
              </div>
            )}
          </div>

          {/* Quick Stats Support widget value-add */}
          <div className="bg-slate-bg border border-border-soft rounded-xl p-6 space-y-4 shadow-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h3 className="font-rubik text-sm font-bold text-zinc-800">My MAXFMS Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-lg border border-border-soft">
                <span className="text-xl font-bold text-primary font-rubik">{bookings.length}</span>
                <span className="text-[10px] text-zinc-400 font-bold block uppercase mt-0.5">Visits Scheduled</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border-soft">
                <span className="text-xl font-bold text-primary font-rubik">
                  {formatCurrency(bookings.reduce((acc, curr) => acc + curr.totalEstimatedPrice, 0))}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold block uppercase mt-0.5">Invested Volume</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
