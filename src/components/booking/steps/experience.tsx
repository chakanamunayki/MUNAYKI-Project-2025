'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { type Locale } from '@/types/i18n';

const experienceSchema = z.object({
  previousCeremonies: z.boolean(),
  medicalConditions: z.boolean(),
  expectations: z.string().min(1, {
    message: 'Please share your expectations for the ceremony.',
  }),
});

type ExperienceData = z.infer<typeof experienceSchema>;

interface ExperienceProps {
  locale: Locale;
  defaultValues?: Partial<ExperienceData>;
  onSubmit: (data: ExperienceData) => void;
}

export function Experience({
  locale,
  defaultValues,
  onSubmit,
}: ExperienceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      previousCeremonies: false,
      medicalConditions: false,
      expectations: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          {locale === 'es' ? 'Tu Experiencia' : 'Your Experience'}
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="previousCeremonies"
              {...register('previousCeremonies')}
            />
            <div className="space-y-1">
              <Label
                htmlFor="previousCeremonies"
                className="text-base font-normal"
              >
                {locale === 'es'
                  ? '¿Has participado en ceremonias similares antes?'
                  : 'Have you participated in similar ceremonies before?'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {locale === 'es'
                  ? 'Marca esta casilla si tienes experiencia previa con ceremonias sagradas.'
                  : 'Check this box if you have previous experience with sacred ceremonies.'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="medicalConditions"
              {...register('medicalConditions')}
            />
            <div className="space-y-1">
              <Label
                htmlFor="medicalConditions"
                className="text-base font-normal"
              >
                {locale === 'es'
                  ? '¿Tienes alguna condición médica que debamos saber?'
                  : 'Do you have any medical conditions we should know about?'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {locale === 'es'
                  ? 'Marca esta casilla si tienes alguna condición médica relevante.'
                  : 'Check this box if you have any relevant medical conditions.'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectations">
              {locale === 'es'
                ? 'Tus expectativas para la ceremonia'
                : 'Your expectations for the ceremony'}
            </Label>
            <Textarea
              id="expectations"
              {...register('expectations')}
              placeholder={
                locale === 'es'
                  ? 'Comparte tus intenciones y lo que esperas experimentar en la ceremonia...'
                  : 'Share your intentions and what you hope to experience in the ceremony...'
              }
              className="min-h-[150px]"
            />
            {errors.expectations && (
              <p className="text-sm text-destructive">
                {errors.expectations.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
} 