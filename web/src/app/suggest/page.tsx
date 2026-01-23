import * as React from 'react';
import { PlusCircle, Info, MapPin, Navigation, Banknote, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { submitRouteSuggestion } from '@/app/actions/community';

export default function SuggestRoutePage() {
  return (
    <div className='min-h-screen bg-white'>
        <div className='p-8 pb-12 bg-dal-black rounded-b-[3rem] text-white'>
            <h1 className='text-3xl font-black mb-2'>Suggest a Route</h1>
            <p className='text-sm text-gray-400'>Share your local knowledge. Recommend the best ways to get around Port Harcourt.</p>
        </div>

        <div className='p-6 -mt-8 space-y-6'>
            <Card className='border-0 shadow-2xl rounded-[2rem]'>
                <CardContent className='p-8 space-y-6'>
                    <form action={submitRouteSuggestion} className='space-y-6'>
                        <div className="grid grid-cols-1 gap-4">
                            <div className='space-y-1.5'>
                                <label className='text-xs font-black uppercase text-gray-400 flex items-center gap-1.5'>
                                    <MapPin className="w-3 h-3 text-dal-gold" /> Origin
                                </label>
                                <Input name="origin" placeholder='e.g. Rumuokoro Junction' className='h-12 border-gray-100 rounded-xl focus:ring-dal-gold' required />
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-xs font-black uppercase text-gray-400 flex items-center gap-1.5'>
                                    <Navigation className="w-3 h-3 text-dal-gold" /> Destination
                                </label>
                                <Input name="destination" placeholder='e.g. Choba (Uniport Gate)' className='h-12 border-gray-100 rounded-xl focus:ring-dal-gold' required />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-1.5'>
                                <label className='text-xs font-black uppercase text-gray-400 flex items-center gap-1.5'>
                                    <Banknote className="w-3 h-3 text-green-500" /> Accurate Fare (₦)
                                </label>
                                <Input name="fare" type="number" placeholder='400' className='h-12 border-gray-100 rounded-xl focus:ring-dal-gold' required />
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-xs font-black uppercase text-gray-400 flex items-center gap-1.5'>
                                    <Bus className="w-3 h-3 text-dal-gold" /> Best Vehicle
                                </label>
                                <select name="vehicle" className='w-full h-12 bg-white border border-gray-100 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-dal-gold/20'>
                                    <option value="Bus">Small Bus (Danfo)</option>
                                    <option value="Keke">Keke Napep</option>
                                    <option value="Taxi">Taxi (Corporate)</option>
                                    <option value="Sienna">Sienna (Executive)</option>
                                </select>
                            </div>
                        </div>

                        <div className='space-y-1.5'>
                            <label className='text-xs font-black uppercase text-gray-400'>Specific Instructions / Landmarks</label>
                            <textarea 
                                name="instructions"
                                className='w-full p-4 min-h-[120px] bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-dal-gold/20' 
                                placeholder='Tell us the stops, where to drop, and any landmarks to watch for...'
                            ></textarea>
                        </div>

                        <Button type="submit" className='w-full h-14 bg-dal-gold hover:bg-black hover:text-white text-dal-black font-black text-base rounded-2xl shadow-lg transition-all'>
                            <PlusCircle className='w-5 h-5 mr-2' />
                            SUBMIT RECOMMENDATION
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className='bg-blue-50 p-6 rounded-3xl flex gap-4 border border-blue-100'>
                <Info className='w-6 h-6 text-blue-600 shrink-0' />
                <div>
                    <h4 className='font-bold text-blue-900 text-sm'>Intelligence Rewards</h4>
                    <p className='text-xs text-blue-700 leading-relaxed mt-1'>
                        Our community managers verify every suggestion. Approved contributors earn **50 Intel Points** and a "Local Guide" badge.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}