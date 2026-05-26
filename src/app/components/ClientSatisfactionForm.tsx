import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { Globe, CheckCircle2, ChevronRight, ArrowRight, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  language: z.string(),
  clientType: z.array(z.string()).optional(),
  beneficiaryType: z.string().optional(),
  individualOption: z.string().optional(),
  groupOption: z.string().optional(),
  individualOther: z.string().optional(),
  groupOther: z.string().optional(),
  registrationId: z.string().optional(),
  contact: z.string().optional(),
  registeredGroupName: z.string().optional(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  extension: z.string().optional(),
  region: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  barangay: z.string().optional(),
  street: z.string().optional(),
  sex: z.string().optional(),
  birthdate: z.string().optional(),
  profile: z.array(z.string()).optional(),
  interventions: z.array(z.string()).min(1, 'Please select at least one intervention/service.'),
  quantity: z.string().optional(),
  interventionDetails: z.string().optional(),
  cc1: z.string({ required_error: 'Please select an option for CC1.' }),
  cc2: z.string({ required_error: 'Please select an option for CC2.' }),
  cc3: z.string({ required_error: 'Please select an option for CC3.' }),
  sq1: z.string({ required_error: 'Required' }),
  sq2: z.string({ required_error: 'Required' }),
  sq3: z.string({ required_error: 'Required' }),
  sq4: z.string({ required_error: 'Required' }),
  sq5: z.string({ required_error: 'Required' }),
  sq6: z.string({ required_error: 'Required' }),
  sq7: z.string({ required_error: 'Required' }),
  sq8: z.string({ required_error: 'Required' }),
  overall: z.string({ required_error: 'Required' }),
  suggestions: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

export function ClientSatisfactionForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: 'english',
      clientType: [],
      profile: [],
      interventions: []
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const beneficiaryType = watch('beneficiaryType');
  const cc1Value = watch('cc1');

  const onFormSubmit = (data: FormData) => {
    console.log(data);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClear = () => {
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="bg-card rounded-2xl shadow-xl p-8 max-w-md w-full text-center border-t-4 border-primary">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-8">Your feedback has been submitted successfully and will help us improve our services.</p>
          <button 
            onClick={() => { setIsSubmitted(false); reset(); }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  const InputWrapper = ({ label, children, required = false, error }: { label: string, children: React.ReactNode, required?: boolean, error?: string }) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs font-medium text-destructive flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
          <div className="bg-primary px-6 py-10 sm:p-12 text-primary-foreground relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10">
              <Globe className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                    Client Satisfaction Survey
                  </h1>
                  <p className="text-primary-foreground/80 text-base max-w-xl">
                    Help us improve our agricultural services by sharing your experience. Your feedback is valuable to us.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-lg backdrop-blur-sm w-fit shrink-0">
                  <Globe className="w-4 h-4 text-white ml-2" />
                  <select
                    {...register('language')}
                    className="bg-transparent text-white font-medium border-none outline-none focus:ring-0 cursor-pointer text-sm pr-4 appearance-none"
                  >
                    <option value="english" className="text-foreground">English</option>
                    <option value="surigaonon" className="text-foreground">Surigaonon</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="mb-8 p-4 bg-muted rounded-lg border border-border/50 flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                <ChevronRight className="h-4 w-4" />
              </span>
              <p className="text-sm text-foreground/80 leading-relaxed">
                <span className="font-semibold text-foreground">Note:</span> Fields marked with <span className="text-destructive font-bold">*</span> are required. All responses are confidential and will be used solely for service improvement.
              </p>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit, (err) => {
              console.log(err);
              // scroll to first error visually
              const firstErrorElement = document.querySelector('.text-destructive');
              if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            })} className="space-y-12">
              
              {/* Section I - Client Information */}
              <section className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-full"></div>
                <div className="pl-6">
                  <h2 className="text-xl font-semibold text-primary border-b-2 border-secondary/30 pb-3 mb-6">
                    Section I – Client Information <span className="text-sm font-normal text-muted-foreground ml-2">(Optional)</span>
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputWrapper label="Client Type">
                        <div className="flex flex-wrap gap-4">
                          {['Citizen', 'Business', 'Government'].map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="checkbox"
                                value={type.toLowerCase()}
                                {...register('clientType')}
                                className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/30 transition-colors"
                              />
                              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{type}</span>
                            </label>
                          ))}
                        </div>
                      </InputWrapper>

                      <InputWrapper label="Beneficiary Type">
                        <div className="flex gap-6">
                          {[
                            { value: 'individual', label: 'Individual' },
                            { value: 'group', label: 'Group' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                value={option.value}
                                {...register('beneficiaryType')}
                                className="w-4 h-4 border-border text-secondary focus:ring-secondary/30 transition-colors"
                              />
                              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </InputWrapper>
                    </div>

                    {beneficiaryType === 'individual' && (
                      <div className="pl-4 border-l-2 border-border/30 space-y-3 pt-2">
                        <p className="text-sm font-medium text-foreground mb-3">Individual Classification</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { value: 'farmer', label: 'Farmer' },
                            { value: 'fisher', label: 'Fisher' },
                            { value: 'aew', label: 'Agricultural Extension Worker' },
                            { value: 'others', label: 'Others' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                value={option.value}
                                {...register('individualOption')}
                                className="w-4 h-4 border-border text-secondary focus:ring-secondary/30"
                              />
                              <span className="text-sm text-foreground group-hover:text-primary">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <input
                          type="text"
                          {...register('individualOther')}
                          placeholder="If others, please specify"
                          className="mt-2 px-4 py-2.5 rounded-lg w-full max-w-md border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                        />
                      </div>
                    )}

                    {beneficiaryType === 'group' && (
                      <div className="pl-4 border-l-2 border-border/30 space-y-3 pt-2">
                        <p className="text-sm font-medium text-foreground mb-3">Group Classification</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { value: 'fca', label: 'Farmers & Fisherfolks Assoc.' },
                            { value: 'cluster', label: 'Cluster' },
                            { value: 'lgu', label: 'Local Government Unit' },
                            { value: 'school', label: 'School' },
                            { value: 'others', label: 'Others' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                value={option.value}
                                {...register('groupOption')}
                                className="w-4 h-4 border-border text-secondary focus:ring-secondary/30"
                              />
                              <span className="text-sm text-foreground group-hover:text-primary">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <input
                          type="text"
                          {...register('groupOther')}
                          placeholder="If others, please specify"
                          className="mt-2 px-4 py-2.5 rounded-lg w-full max-w-md border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/30">
                      <InputWrapper label="Registration ID">
                        <input type="text" {...register('registrationId')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" placeholder="Enter ID" />
                      </InputWrapper>
                      <InputWrapper label="Contact Number">
                        <input type="text" {...register('contact')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" placeholder="09XX-XXX-XXXX" />
                      </InputWrapper>
                      <InputWrapper label="Registered Group Name">
                        <input type="text" {...register('registeredGroupName')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" placeholder="Name of Group/Assoc." />
                      </InputWrapper>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      <InputWrapper label="First Name">
                        <input type="text" {...register('firstName')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Middle Name">
                        <input type="text" {...register('middleName')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Last Name">
                        <input type="text" {...register('lastName')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Extension">
                        <input type="text" {...register('extension')} placeholder="Jr., Sr., III" className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWrapper label="Region">
                        <input type="text" {...register('region')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Province">
                        <input type="text" {...register('province')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                      <InputWrapper label="City/Municipality">
                        <input type="text" {...register('city')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                      <InputWrapper label="Barangay">
                        <input type="text" {...register('barangay')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                    </div>

                    <InputWrapper label="Street/Purok/House No.">
                      <input type="text" {...register('street')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                    </InputWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWrapper label="Sex">
                        <div className="flex gap-6 mt-2">
                          {['Male', 'Female'].map((sex) => (
                            <label key={sex} className="flex items-center gap-2 cursor-pointer group">
                              <input type="radio" value={sex.toLowerCase()} {...register('sex')} className="w-4 h-4 border-border text-secondary focus:ring-secondary/30" />
                              <span className="text-sm text-foreground group-hover:text-primary">{sex}</span>
                            </label>
                          ))}
                        </div>
                      </InputWrapper>
                      <InputWrapper label="Birthdate">
                        <input type="date" {...register('birthdate')} className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none" />
                      </InputWrapper>
                    </div>

                    <InputWrapper label="Check all that apply">
                      <div className="flex flex-wrap gap-4 mt-2">
                        {[
                          { value: 'arb', label: 'Agrarian Reform Beneficiary (ARB)' },
                          { value: 'ip', label: 'Indigenous Peoples (IP)' },
                          { value: 'pwd', label: 'Person with Disability (PWD)' },
                          { value: '4ps', label: "Pantawid Pamilyang Pilipino Program (4P's)" }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" value={option.value} {...register('profile')} className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/30" />
                            <span className="text-sm text-foreground group-hover:text-primary">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </InputWrapper>
                  </div>
                </div>
              </section>

              {/* Section II - Intervention / Service Received */}
              <section className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-full"></div>
                <div className="pl-6">
                  <h2 className="text-xl font-semibold text-primary border-b-2 border-secondary/30 pb-3 mb-6">
                    Section II – Service Received <span className="text-destructive">*</span>
                  </h2>

                  <div className="space-y-6">
                    <InputWrapper label="Type of Intervention / Service" required error={errors.interventions?.message}>
                      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ${errors.interventions ? 'p-3 rounded-lg bg-destructive/5 border border-destructive/20' : ''}`}>
                        {[
                          'Production Support',
                          'Training / Seminar',
                          'Market Services',
                          'Irrigation Services',
                          'Equipment / Facility',
                          'Others'
                        ].map((service) => (
                          <label key={service} className="flex items-center gap-2 cursor-pointer group bg-card p-3 rounded-lg border border-border hover:border-primary/50 transition-all">
                            <input
                              type="checkbox"
                              value={service.toLowerCase()}
                              {...register('interventions')}
                              className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/30 mt-0.5"
                            />
                            <span className="text-sm text-foreground">{service}</span>
                          </label>
                        ))}
                      </div>
                    </InputWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWrapper label="Quantity (if applicable)">
                        <input
                          type="text"
                          {...register('quantity')}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                          placeholder="e.g., 50 bags, 10 units"
                        />
                      </InputWrapper>
                      <InputWrapper label="Intervention Details">
                        <textarea
                          {...register('interventionDetails')}
                          rows={2}
                          maxLength={60}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none resize-none"
                          placeholder="Brief description of the service"
                        />
                      </InputWrapper>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section III - Citizen's Charter */}
              <section className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-full"></div>
                <div className="pl-6">
                  <h2 className="text-xl font-semibold text-primary border-b-2 border-secondary/30 pb-3 mb-6">
                    Section III – Citizen's Charter (CC) <span className="text-destructive">*</span>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    The Citizen's Charter is an official document that communicates, in simple terms, the service standards or pledges of an agency.
                  </p>

                  <div className="space-y-8">
                    <InputWrapper label="CC1: Which of the following best describes your awareness of a CC?" required error={errors.cc1?.message}>
                      <div className={`space-y-3 mt-3 ${errors.cc1 ? 'p-3 rounded-lg bg-destructive/5 border border-destructive/20' : ''}`}>
                        {[
                          { value: '1', label: 'I know what a CC is and I saw this office\'s CC.' },
                          { value: '2', label: 'I know what a CC is but I did NOT see this office\'s CC.' },
                          { value: '3', label: 'I learned of the CC only when I saw this office\'s CC.' },
                          { value: '4', label: 'I do not know what a CC is and I did not see one in this office.' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-start gap-3 cursor-pointer group bg-card border border-border p-3 rounded-lg hover:border-primary/50 transition-colors">
                            <input
                              type="radio"
                              value={option.value}
                              {...register('cc1')}
                              className="w-4 h-4 border-border text-secondary focus:ring-secondary/30 mt-0.5"
                            />
                            <span className="text-sm text-foreground">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </InputWrapper>

                    <InputWrapper label="CC2: If aware of CC, would you say that the CC of this office was easy to see?" required error={errors.cc2?.message}>
                      <div className={`space-y-3 mt-3 ${errors.cc2 ? 'p-3 rounded-lg bg-destructive/5 border border-destructive/20' : ''}`}>
                        {cc1Value !== '4' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            {[
                              { value: '1', label: 'Strongly Agree' },
                              { value: '2', label: 'Agree' },
                              { value: '3', label: 'Neutral' },
                              { value: '4', label: 'Disagree' },
                              { value: '5', label: 'Strongly Disagree' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center justify-center gap-2 cursor-pointer group bg-card border border-border p-3 rounded-lg hover:border-primary/50 transition-colors">
                                <input
                                  type="radio"
                                  value={option.value}
                                  {...register('cc2')}
                                  className="w-4 h-4 border-border text-secondary focus:ring-secondary/30"
                                />
                                <span className="text-sm text-foreground whitespace-nowrap">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground flex items-center gap-2">
                            <input type="radio" value="na" {...register('cc2')} checked readOnly className="w-4 h-4 text-secondary opacity-50" />
                            Not Applicable (Selected Option 4 in CC1)
                          </div>
                        )}
                      </div>
                    </InputWrapper>

                    <InputWrapper label="CC3: If aware of CC, how much did the CC help you in your transaction?" required error={errors.cc3?.message}>
                      <div className={`space-y-3 mt-3 ${errors.cc3 ? 'p-3 rounded-lg bg-destructive/5 border border-destructive/20' : ''}`}>
                        {cc1Value !== '4' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            {[
                              { value: '1', label: 'Strongly Agree' },
                              { value: '2', label: 'Agree' },
                              { value: '3', label: 'Neutral' },
                              { value: '4', label: 'Disagree' },
                              { value: '5', label: 'Strongly Disagree' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center justify-center gap-2 cursor-pointer group bg-card border border-border p-3 rounded-lg hover:border-primary/50 transition-colors">
                                <input
                                  type="radio"
                                  value={option.value}
                                  {...register('cc3')}
                                  className="w-4 h-4 border-border text-secondary focus:ring-secondary/30"
                                />
                                <span className="text-sm text-foreground whitespace-nowrap">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground flex items-center gap-2">
                            <input type="radio" value="na" {...register('cc3')} checked readOnly className="w-4 h-4 text-secondary opacity-50" />
                            Not Applicable (Selected Option 4 in CC1)
                          </div>
                        )}
                      </div>
                    </InputWrapper>
                  </div>
                </div>
              </section>

              {/* Section IV - CSM */}
              <section className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-full"></div>
                <div className="pl-6">
                  <h2 className="text-xl font-semibold text-primary border-b-2 border-secondary/30 pb-3 mb-6">
                    Section IV – Satisfaction Measurement <span className="text-destructive">*</span>
                  </h2>

                  <div className="bg-primary/5 text-primary p-4 rounded-lg mb-6 text-sm border border-primary/20">
                    <p className="font-semibold mb-1">Rating Scale:</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <span><strong>1</strong> = Strongly Disagree</span>
                      <span><strong>2</strong> = Disagree</span>
                      <span><strong>3</strong> = Neutral</span>
                      <span><strong>4</strong> = Agree</span>
                      <span><strong>5</strong> = Strongly Agree</span>
                    </div>
                  </div>

                  <div className={`overflow-x-auto rounded-xl border ${Object.keys(errors).some(k => k.startsWith('sq') || k === 'overall') ? 'border-destructive ring-1 ring-destructive/50' : 'border-border'}`}>
                    <table className="w-full border-collapse text-sm text-left">
                      <thead>
                        <tr className="bg-muted text-foreground border-b border-border">
                          <th className="p-4 font-semibold w-1/4">Category</th>
                          <th className="p-4 font-semibold">Criteria</th>
                          <th className="p-4 font-semibold text-center w-12">1</th>
                          <th className="p-4 font-semibold text-center w-12">2</th>
                          <th className="p-4 font-semibold text-center w-12">3</th>
                          <th className="p-4 font-semibold text-center w-12">4</th>
                          <th className="p-4 font-semibold text-center w-12">5</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50 bg-card">
                        {[
                          { field: 'sq1', category: 'Responsiveness', question: 'I spent a reasonable amount of time for my transaction.' },
                          { field: 'sq2', category: 'Reliability', question: 'The office followed the transaction\'s requirements and steps.' },
                          { field: 'sq3', category: 'Access & Facilities', question: 'My transaction was easy, and the facilities were appropriate.' },
                          { field: 'sq4', category: 'Communication', question: 'I easily understood the information provided to me.' },
                          { field: 'sq5', category: 'Costs', question: 'I paid a reasonable amount of fees for my transaction.' },
                          { field: 'sq6', category: 'Integrity', question: 'I am confident my transaction was secure and safe.' },
                          { field: 'sq7', category: 'Assurance', question: 'The staff were approachable, helpful, and professional.' },
                          { field: 'sq8', category: 'Outcome', question: 'I got what I needed from the government office.' },
                          { field: 'overall', category: 'Overall Satisfaction', question: 'Overall, I am satisfied with the service.' }
                        ].map((item, idx) => {
                          const hasError = errors[item.field as keyof FormData];
                          return (
                            <tr key={item.field} className={`hover:bg-muted/30 transition-colors ${hasError ? 'bg-destructive/5' : ''}`}>
                              <td className="p-4 text-foreground/80 font-medium bg-muted/10 border-r border-border/50">{item.category}</td>
                              <td className="p-4 text-foreground">
                                {item.question}
                                {hasError && <span className="block text-xs text-destructive mt-1">Please provide a rating.</span>}
                              </td>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <td key={value} className="p-4 text-center">
                                  <input
                                    type="radio"
                                    value={value.toString()}
                                    {...register(item.field as keyof FormData)}
                                    className="w-4 h-4 border-border text-secondary focus:ring-secondary/30 cursor-pointer"
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8">
                    <InputWrapper label="Suggestions for Improvement / Additional Comments">
                      <textarea
                        {...register('suggestions')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none resize-none"
                        placeholder="Please share your suggestions to help us improve our services..."
                      />
                    </InputWrapper>
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="sticky bottom-0 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 bg-card border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col-reverse sm:flex-row gap-4 sm:justify-end z-20">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted font-medium transition-colors text-sm"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
                >
                  Submit Survey <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
