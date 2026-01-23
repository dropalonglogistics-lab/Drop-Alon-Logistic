import * as React from 'react';
import { AlertCircle, Shield } from 'lucide-react';
import { ReportIssueForm } from '@/components/reporting/ReportIssueForm';

export default function ReportPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
        <div className='bg-dal-black text-white p-8 pt-12 rounded-b-[3rem] shadow-xl'>
            <div className='flex items-center gap-3 mb-4'>
                <div className='p-2 bg-dal-gold rounded-xl'>
                    <AlertCircle className='w-6 h-6 text-dal-black' />
                </div>
                <h1 className='text-2xl font-bold'>Report Issue</h1>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed mb-6'>
                Help the community by sharing real-time updates. Your reports help our routing algorithm find faster paths for everyone.
            </p>
            
            <div className='flex items-center gap-2 text-[10px] font-bold text-dal-gold uppercase tracking-widest bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10'>
                <Shield className='w-3 h-3' />
                Verifying via Crowd-Sourcing
            </div>
        </div>

        <div className='p-6 -mt-6'>
            <ReportIssueForm />
        </div>
    </div>
  )
}