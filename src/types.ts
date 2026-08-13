export type UserRole = 
  | 'landing' 
  | 'patient' 
  | 'doctor' 
  | 'receptionist' 
  | 'lab' 
  | 'pharmacist' 
  | 'billing' 
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  title?: string;
  department?: string;
}

export type AppointmentStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
export type ConsultationType = 'Online Consultation' | 'In-Person Consultation';

export interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string;
  time: string;
  type: ConsultationType;
  status: AppointmentStatus;
  tokenNumber: string;
  roomNumber?: string;
  reason: string;
}

export interface QueueToken {
  id: string;
  tokenNumber: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  department: string;
  status: 'Serving' | 'Waiting' | 'Priority' | 'Completed';
  estimatedWaitMinutes: number;
  arrivalTime: string;
}

export interface PatientVitals {
  bloodPressure: string;
  heartRate: number;
  temperature: string;
  spO2: number;
  weightKg: number;
  bloodGroup: string;
  bmi: number;
}

export interface MedicalRecordVisit {
  id: string;
  date: string;
  doctorName: string;
  specialty: string;
  type: string;
  chiefComplaint: string;
  diagnosis: string;
  clinicalNotes: string;
  vitals: PatientVitals;
  labRequests: string[];
  prescriptionId?: string;
}

export interface PatientProfileData {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  allergies: string[];
  chronicConditions: string[];
  vaccinations: Array<{ name: string; date: string; status: 'Completed' | 'Overdue' | 'Scheduled' }>;
  visits: MedicalRecordVisit[];
}

export type LabStatus = 'Requested' | 'Sample Collected' | 'Testing' | 'Report Ready';

export interface LabRequestItem {
  id: string;
  testName: string;
  category: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorName: string;
  dateRequested: string;
  status: LabStatus;
  urgent: boolean;
  sampleType: string;
  resultSummary?: string;
  flagCount?: number;
  reportPdfName?: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
}

export interface Prescription {
  id: string;
  prescriptionNo: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  date: string;
  status: 'Pending' | 'Dispensing' | 'Fulfilled';
  medicines: PrescriptionMedicine[];
}

export interface MedicineInventory {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  expiryDate: string;
  price: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Expiring Soon' | 'Out of Stock';
}

export interface InvoiceItem {
  id: string;
  description: string;
  category: 'Consultation' | 'Laboratory' | 'Pharmacy' | 'Facility';
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  patientName: string;
  patientPhone: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Unpaid' | 'Paid';
  paymentMethod?: 'UPI' | 'Card' | 'Net Banking';
  paidAt?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  timeAgo: string;
  role: string;
  user: string;
  action: string;
  details: string;
  badgeColor: string;
}

export interface AppNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert' | 'appointment';
  read: boolean;
  roleTarget: UserRole | 'all';
}

export interface AIReportAnalysis {
  summary: string;
  totalValuesAnalyzed: number;
  valuesRequiringAttention: number;
  flaggedItems: Array<{
    parameter: string;
    value: string;
    normalRange: string;
    status: 'Low' | 'High' | 'Normal';
    clinicalNote: string;
  }>;
  observations: string[];
  recommendedFollowUp: string;
}
