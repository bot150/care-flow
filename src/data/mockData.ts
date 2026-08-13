import { 
  Appointment, 
  QueueToken, 
  PatientProfileData, 
  LabRequestItem, 
  Prescription, 
  MedicineInventory, 
  Invoice, 
  AuditLog, 
  AppNotification 
} from '../types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patientName: 'Ananya Rao',
    patientAge: 28,
    patientGender: 'Female',
    doctorName: 'Dr. Rahul Rao',
    doctorSpecialty: 'Cardiologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    time: '10:30 AM',
    type: 'Online Consultation',
    status: 'Scheduled',
    tokenNumber: '#26',
    roomNumber: 'Consultation Room 3',
    reason: 'Routine cardiac follow-up & ECG review'
  },
  {
    id: 'apt-2',
    patientName: 'Priya Sharma',
    patientAge: 34,
    patientGender: 'Female',
    doctorName: 'Dr. Rahul Rao',
    doctorSpecialty: 'Cardiologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    time: '10:00 AM',
    type: 'In-Person Consultation',
    status: 'In Progress',
    tokenNumber: '#24',
    roomNumber: 'Consultation Room 3',
    reason: 'Hypertension evaluation'
  },
  {
    id: 'apt-3',
    patientName: 'Rahul Kumar',
    patientAge: 45,
    patientGender: 'Male',
    doctorName: 'Dr. Rahul Rao',
    doctorSpecialty: 'Cardiologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    time: '11:15 AM',
    type: 'Online Consultation',
    status: 'Scheduled',
    tokenNumber: '#25',
    reason: 'Post-stent recovery progress'
  },
  {
    id: 'apt-4',
    patientName: 'Kiran Patel',
    patientAge: 62,
    patientGender: 'Male',
    doctorName: 'Dr. Priya Nair',
    doctorSpecialty: 'Neurologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813566-78a1005a74e5?w=150&auto=format&fit=crop&q=80',
    date: 'Today',
    time: '11:45 AM',
    type: 'In-Person Consultation',
    status: 'Scheduled',
    tokenNumber: '#27',
    roomNumber: 'Room 5',
    reason: 'Migraine aura assessment'
  }
];

export const INITIAL_QUEUE: QueueToken[] = [
  {
    id: 'q-24',
    tokenNumber: '#24',
    patientName: 'Priya Sharma',
    patientAge: 34,
    doctorName: 'Dr. Rahul Rao',
    department: 'Cardiology',
    status: 'Serving',
    estimatedWaitMinutes: 0,
    arrivalTime: '09:45 AM'
  },
  {
    id: 'q-25',
    tokenNumber: '#25',
    patientName: 'Rahul Kumar',
    patientAge: 45,
    doctorName: 'Dr. Rahul Rao',
    department: 'Cardiology',
    status: 'Waiting',
    estimatedWaitMinutes: 12,
    arrivalTime: '10:02 AM'
  },
  {
    id: 'q-26',
    tokenNumber: '#26',
    patientName: 'Ananya Rao',
    patientAge: 28,
    doctorName: 'Dr. Rahul Rao',
    department: 'Cardiology',
    status: 'Waiting',
    estimatedWaitMinutes: 24,
    arrivalTime: '10:10 AM'
  },
  {
    id: 'q-27',
    tokenNumber: '#27',
    patientName: 'Kiran Patel',
    patientAge: 62,
    doctorName: 'Dr. Priya Nair',
    department: 'Neurology',
    status: 'Priority',
    estimatedWaitMinutes: 30,
    arrivalTime: '10:15 AM'
  },
  {
    id: 'q-28',
    tokenNumber: '#28',
    patientName: 'Meera Das',
    patientAge: 29,
    doctorName: 'Dr. Amit Shah',
    department: 'General Medicine',
    status: 'Waiting',
    estimatedWaitMinutes: 42,
    arrivalTime: '10:20 AM'
  }
];

export const CURRENT_PATIENT_PROFILE: PatientProfileData = {
  id: 'pat-1042',
  name: 'Ananya Rao',
  age: 28,
  gender: 'Female',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  email: 'ananya.rao@careflow.health',
  allergies: ['Penicillin (Mild rash)', 'Peanuts'],
  chronicConditions: ['Mild Asthma', 'Familial Hyperlipidemia'],
  vaccinations: [
    { name: 'COVID-19 Booster (Moderna)', date: 'Jan 2025', status: 'Completed' },
    { name: 'Hepatitis B (Dose 3)', date: 'Nov 2024', status: 'Completed' },
    { name: 'Influenza Annual', date: 'Oct 2025', status: 'Scheduled' }
  ],
  visits: [
    {
      id: 'vis-101',
      date: 'Aug 13, 2026',
      doctorName: 'Dr. Rahul Rao',
      specialty: 'Cardiology',
      type: 'Follow-up Consultation',
      chiefComplaint: 'Occasional chest tightness after workouts and fatigue',
      diagnosis: 'Sinus Tachycardia, Mild Anemia Suspected',
      clinicalNotes: 'Patient reports mild dyspnea upon strenuous aerobic activity. BP stable at 118/76 mmHg. Heart sounds S1 S2 normal. Ordered Complete Blood Count (CBC) and Lipid Panel to rule out iron deficiency.',
      vitals: {
        bloodPressure: '118/76 mmHg',
        heartRate: 78,
        temperature: '98.4 °F',
        spO2: 99,
        weightKg: 58,
        bloodGroup: 'O+',
        bmi: 21.3
      },
      labRequests: ['CBC Report', 'Lipid Panel'],
      prescriptionId: 'pres-892'
    },
    {
      id: 'vis-100',
      date: 'Aug 11, 2026',
      doctorName: 'Dr. Amit Shah',
      specialty: 'General Medicine',
      type: 'Primary Care Visit',
      chiefComplaint: 'Seasonal viral allergy & low energy',
      diagnosis: 'Upper Respiratory Allergy',
      clinicalNotes: 'Prescribed anti-histamine therapy and supportive vitamins. Advised hydration.',
      vitals: {
        bloodPressure: '120/80 mmHg',
        heartRate: 74,
        temperature: '98.8 °F',
        spO2: 98,
        weightKg: 58.5,
        bloodGroup: 'O+',
        bmi: 21.5
      },
      labRequests: [],
      prescriptionId: 'pres-885'
    },
    {
      id: 'vis-99',
      date: 'Jul 28, 2026',
      doctorName: 'Dr. Rahul Rao',
      specialty: 'Cardiology',
      type: 'Initial Cardiology Screening',
      chiefComplaint: 'Family history of early coronary artery disease',
      diagnosis: 'Prophylactic Risk Assessment',
      clinicalNotes: 'Baseline ECG unremarkable. Recommended regular exercise and annual lipid screening.',
      vitals: {
        bloodPressure: '122/78 mmHg',
        heartRate: 72,
        temperature: '98.6 °F',
        spO2: 99,
        weightKg: 59,
        bloodGroup: 'O+',
        bmi: 21.7
      },
      labRequests: ['Lipid Panel'],
      prescriptionId: undefined
    }
  ]
};

export const INITIAL_LAB_REQUESTS: LabRequestItem[] = [
  {
    id: 'lab-301',
    testName: 'Complete Blood Count (CBC)',
    category: 'Hematology',
    patientName: 'Ananya Rao',
    patientAge: 28,
    patientGender: 'Female',
    doctorName: 'Dr. Rahul Rao',
    dateRequested: 'Aug 13, 2026',
    status: 'Report Ready',
    urgent: true,
    sampleType: 'Whole Blood (EDTA)',
    resultSummary: '12 parameters analyzed. Hemoglobin 11.8 g/dL (Mild Anemia). WBC 8,200/µL.',
    flagCount: 3,
    reportPdfName: 'CBC_Report_AnanyaRao.pdf'
  },
  {
    id: 'lab-302',
    testName: 'Comprehensive Lipid Panel',
    category: 'Biochemistry',
    patientName: 'Ananya Rao',
    patientAge: 28,
    patientGender: 'Female',
    doctorName: 'Dr. Rahul Rao',
    dateRequested: 'Aug 13, 2026',
    status: 'Testing',
    urgent: false,
    sampleType: 'Serum',
    reportPdfName: 'Lipid_Panel_AnanyaRao.pdf'
  },
  {
    id: 'lab-303',
    testName: 'Thyroid Stimulating Hormone (TSH)',
    category: 'Endocrinology',
    patientName: 'Priya Sharma',
    patientAge: 34,
    patientGender: 'Female',
    doctorName: 'Dr. Amit Shah',
    dateRequested: 'Aug 12, 2026',
    status: 'Sample Collected',
    urgent: false,
    sampleType: 'Serum'
  },
  {
    id: 'lab-304',
    testName: 'HbA1c & Fasting Glucose',
    category: 'Biochemistry',
    patientName: 'Rahul Kumar',
    patientAge: 45,
    patientGender: 'Male',
    doctorName: 'Dr. Rahul Rao',
    dateRequested: 'Aug 12, 2026',
    status: 'Requested',
    urgent: false,
    sampleType: 'Venous Blood'
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'pres-892',
    prescriptionNo: '#892',
    patientName: 'Ananya Rao',
    patientAge: 28,
    doctorName: 'Dr. Rahul Rao',
    date: 'Aug 13, 2026',
    status: 'Pending',
    medicines: [
      {
        id: 'med-1',
        name: 'Amoxicillin Trihydrate',
        dosage: '500 mg',
        frequency: '1 tablet 3x daily (After Meals)',
        duration: '5 Days',
        instructions: 'Take with plenty of water',
        quantity: 15
      },
      {
        id: 'med-2',
        name: 'Paracetamol',
        dosage: '650 mg',
        frequency: '1 tablet as needed (SOS)',
        duration: '3 Days',
        instructions: 'Max 3 tablets in 24 hours',
        quantity: 10
      },
      {
        id: 'med-3',
        name: 'Ferrous Ascorbate (Iron Supplement)',
        dosage: '100 mg',
        frequency: '1 tablet once daily (At Bedtime)',
        duration: '30 Days',
        instructions: 'Take on empty stomach or with Vitamin C juice',
        quantity: 30
      }
    ]
  },
  {
    id: 'pres-885',
    prescriptionNo: '#885',
    patientName: 'Rahul Kumar',
    patientAge: 45,
    doctorName: 'Dr. Rahul Rao',
    date: 'Aug 11, 2026',
    status: 'Fulfilled',
    medicines: [
      {
        id: 'med-4',
        name: 'Atorvastatin',
        dosage: '10 mg',
        frequency: '1 tablet daily at night',
        duration: '30 Days',
        instructions: 'Take regularly',
        quantity: 30
      }
    ]
  }
];

export const INITIAL_MEDICINE_INVENTORY: MedicineInventory[] = [
  {
    id: 'inv-1',
    name: 'Amoxicillin Trihydrate 500mg',
    category: 'Antibiotics',
    stock: 240,
    unit: 'Tablets',
    expiryDate: 'Dec 2027',
    price: 12.50,
    reorderLevel: 50,
    status: 'In Stock'
  },
  {
    id: 'inv-2',
    name: 'Paracetamol 650mg (Dolo)',
    category: 'Analgesics',
    stock: 580,
    unit: 'Tablets',
    expiryDate: 'Jan 2028',
    price: 3.00,
    reorderLevel: 100,
    status: 'In Stock'
  },
  {
    id: 'inv-3',
    name: 'Atorvastatin 10mg',
    category: 'Cardiovascular',
    stock: 18,
    unit: 'Tablets',
    expiryDate: 'Oct 2026',
    price: 18.00,
    reorderLevel: 30,
    status: 'Low Stock'
  },
  {
    id: 'inv-4',
    name: 'Metformin HCl 500mg',
    category: 'Anti-Diabetic',
    stock: 410,
    unit: 'Tablets',
    expiryDate: 'Nov 2027',
    price: 6.50,
    reorderLevel: 80,
    status: 'In Stock'
  },
  {
    id: 'inv-5',
    name: 'Pantoprazole 40mg',
    category: 'Gastroenterology',
    stock: 12,
    unit: 'Tablets',
    expiryDate: 'Sep 2026',
    price: 9.00,
    reorderLevel: 25,
    status: 'Expiring Soon'
  },
  {
    id: 'inv-6',
    name: 'Ferrous Ascorbate 100mg',
    category: 'Supplements',
    stock: 150,
    unit: 'Tablets',
    expiryDate: 'Aug 2028',
    price: 15.00,
    reorderLevel: 40,
    status: 'In Stock'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-10482',
    invoiceNo: 'CF-10482',
    patientName: 'Ananya Rao',
    patientPhone: '+91 98765 43210',
    date: 'Aug 13, 2026',
    items: [
      { id: 'item-1', description: 'Specialist Consultation (Dr. Rahul Rao - Cardiology)', category: 'Consultation', amount: 500 },
      { id: 'item-2', description: 'Complete Blood Count (CBC) Laboratory Test', category: 'Laboratory', amount: 300 },
      { id: 'item-3', description: 'Prescription Medicines (#892: Amoxicillin, Paracetamol, Iron)', category: 'Pharmacy', amount: 450 }
    ],
    subtotal: 1250,
    tax: 50,
    total: 1300,
    status: 'Unpaid'
  },
  {
    id: 'inv-10481',
    invoiceNo: 'CF-10481',
    patientName: 'Priya Sharma',
    patientPhone: '+91 98123 76543',
    date: 'Aug 12, 2026',
    items: [
      { id: 'item-4', description: 'General Consultation', category: 'Consultation', amount: 400 },
      { id: 'item-5', description: 'TSH Hormone Test', category: 'Laboratory', amount: 450 }
    ],
    subtotal: 850,
    tax: 40,
    total: 890,
    status: 'Paid',
    paymentMethod: 'UPI',
    paidAt: 'Aug 12, 2026, 04:15 PM'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '10:42 AM',
    timeAgo: '3 mins ago',
    role: 'Doctor',
    user: 'Dr. Rahul Rao',
    action: 'EMR Record Accessed',
    details: 'Viewed Patient #Pat-1042 (Ananya Rao) cardiology visit history and vitals.',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'log-2',
    timestamp: '10:38 AM',
    timeAgo: '7 mins ago',
    role: 'Laboratory',
    user: 'Tech S. Verma',
    action: 'Lab Report Uploaded',
    details: 'Uploaded verified CBC digital report for Ananya Rao. Status set to Report Ready.',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  },
  {
    id: 'log-3',
    timestamp: '10:31 AM',
    timeAgo: '14 mins ago',
    role: 'Pharmacist',
    user: 'Pharm. M. Joshi',
    action: 'Prescription Dispense Started',
    details: 'Processing Prescription #892 for Ananya Rao. Reserved 3 items from main inventory.',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  },
  {
    id: 'log-4',
    timestamp: '10:20 AM',
    timeAgo: '25 mins ago',
    role: 'Receptionist',
    user: 'Staff R. Gupta',
    action: 'Token Called & Assigned',
    details: 'Called Token #24 (Priya Sharma) into Consultation Room 3.',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
  },
  {
    id: 'log-5',
    timestamp: '09:55 AM',
    timeAgo: '50 mins ago',
    role: 'Admin',
    user: 'System Admin',
    action: 'Roster Update',
    details: 'Updated shift schedule for Cardiology & General OPD departments.',
    badgeColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    timestamp: '10:38 AM',
    title: 'CBC Report Ready',
    message: 'Your Complete Blood Count (CBC) report is ready for viewing.',
    type: 'success',
    read: false,
    roleTarget: 'all'
  },
  {
    id: 'notif-2',
    timestamp: '10:30 AM',
    title: 'Upcoming Appointment',
    message: 'Consultation with Dr. Rahul Rao starts today at 10:30 AM.',
    type: 'appointment',
    read: false,
    roleTarget: 'patient'
  },
  {
    id: 'notif-3',
    timestamp: '10:15 AM',
    title: 'New Prescription #892',
    message: 'Dr. Rahul Rao issued a new prescription containing 3 items.',
    type: 'info',
    read: true,
    roleTarget: 'all'
  },
  {
    id: 'notif-4',
    timestamp: '09:45 AM',
    title: 'Lab Attention Required',
    message: '2 laboratory samples pending verification in Biochemistry.',
    type: 'alert',
    read: true,
    roleTarget: 'lab'
  }
];
