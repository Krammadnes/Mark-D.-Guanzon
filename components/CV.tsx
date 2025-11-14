import React from 'react';
import { CVData } from '../types';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationIcon } from './icons/LocationIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { AcademicCapIcon } from './icons/AcademicCapIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface CVProps {
  data: CVData;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-6">
    <div className="flex items-center mb-3">
      {icon}
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 ml-2">{title}</h2>
    </div>
    <div className="ml-8 border-l-2 border-indigo-200 dark:border-indigo-800 pl-4">
      {children}
    </div>
  </section>
);

export const CV: React.FC<CVProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-6 md:p-10">
      <header className="text-center border-b-2 border-gray-200 dark:border-gray-700 pb-6 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{data.name}</h1>
        <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium mt-1">{data.title}</p>
        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
          <a href={`mailto:${data.contact.email}`} className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <MailIcon className="w-4 h-4 mr-1.5" />
            {data.contact.email}
          </a>
          <a href={`tel:${data.contact.phone}`} className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <PhoneIcon className="w-4 h-4 mr-1.5" />
            {data.contact.phone}
          </a>
          <div className="flex items-center">
            <LocationIcon className="w-4 h-4 mr-1.5" />
            {data.contact.location}
          </div>
        </div>
      </header>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Professional Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.summary}</p>
        </div>

        <Section title="Experience" icon={<BriefcaseIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}>
          {data.experience.map((job, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{job.title}</h3>
              <p className="font-medium text-gray-600 dark:text-gray-400">{job.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">{job.period}</p>
              <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
            </div>
          ))}
        </Section>

        <Section title="Education" icon={<AcademicCapIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{edu.degree}</h3>
              <p className="font-medium text-gray-600 dark:text-gray-400">{edu.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{edu.period}</p>
            </div>
          ))}
        </Section>

        <Section title="Skills" icon={<SparklesIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}>
          <ul className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <li key={index} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
                {skill}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
};
