import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
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
import { 
  INITIAL_APPOINTMENTS, 
  INITIAL_QUEUE, 
  CURRENT_PATIENT_PROFILE, 
  INITIAL_LAB_REQUESTS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_MEDICINE_INVENTORY, 
  INITIAL_INVOICES, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  title?: string;
  department?: string;
  phone?: string;
  specialization?: string;
  qualifications?: string;
  experience?: string;
  hospitalBranch?: string;
}

export const INITIAL_DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'usr-pat-1',
    name: 'Ananya Rao',
    email: 'patient@careflow.demo',
    password: 'demo123',
    role: 'patient',
    title: 'Patient Pat-1042',
    phone: '+91 98765 43210'
  },
  {
    id: 'usr-doc-1',
    name: 'Dr. Rahul Rao',
    email: 'doctor@careflow.demo',
    password: 'demo123',
    role: 'doctor',
    title: 'MD, DM Cardiology',
    department: 'Cardiology',
    specialization: 'Cardiology',
    qualifications: 'MD, DM Cardiology',
    experience: '12 Years',
    hospitalBranch: 'CareFlow Central Hospital'
  },
  {
    id: 'usr-rec-1',
    name: 'Suma Patel',
    email: 'reception@careflow.demo',
    password: 'demo123',
    role: 'receptionist',
    title: 'Front Desk OPD Lead',
    department: 'Hospital Administration'
  },
  {
    id: 'usr-lab-1',
    name: 'Rohan Shah',
    email: 'lab@careflow.demo',
    password: 'demo123',
    role: 'lab',
    title: 'Senior Diagnostics Specialist',
    department: 'Pathology & Hematology'
  },
  {
    id: 'usr-pharm-1',
    name: 'Meera Nair',
    email: 'pharmacy@careflow.demo',
    password: 'demo123',
    role: 'pharmacist',
    title: 'Chief Dispensing Pharmacist',
    department: 'Central Pharmacy'
  },
  {
    id: 'usr-bill-1',
    name: 'Vikram Mehta',
    email: 'billing@careflow.demo',
    password: 'demo123',
    role: 'billing',
    title: 'Financial Revenue Officer',
    department: 'Accounts & Billing'
  },
  {
    id: 'usr-adm-1',
    name: 'Hospital Administrator',
    email: 'admin@careflow.demo',
    password: 'demo123',
    role: 'admin',
    title: 'Chief Operating Officer',
    department: 'Executive Board'
  }
];

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedPortalRole: UserRole;
  setSelectedPortalRole: (role: UserRole) => void;
  currentUser: UserAccount | null;
  
  // Auth methods
  loginUser: (email: string, pass: string, targetPortalRole: UserRole) => { success: boolean; isRoleMismatch?: boolean; actualRole?: UserRole; error?: string };
  registerUser: (userData: Omit<UserAccount, 'id'>) => { success: boolean; message?: string; error?: string };
  logoutUser: () => void;

  isDark: boolean;
  toggleDarkMode: () => void;
  
  appointments: Appointment[];
  queue: QueueToken[];
  patientProfile: PatientProfileData;
  labRequests: LabRequestItem[];
  prescriptions: Prescription[];
  inventory: MedicineInventory[];
  invoices: Invoice[];
  auditLogs: AuditLog[];
  notifications: AppNotification[];
  
  // Active workflow actions
  bookAppointment: (doctorName: string, date: string, time: string, type: 'Online Consultation' | 'In-Person Consultation', reason: string) => void;
  callNextPatientInQueue: () => void;
  updateQueueTokenStatus: (id: string, status: QueueToken['status']) => void;
  updateLabStatus: (id: string, status: LabRequestItem['status'], reportPdfName?: string) => void;
  fulfillPrescription: (id: string) => void;
  payInvoice: (id: string, method: 'UPI' | 'Card' | 'Net Banking') => void;
  addMedicalVisitNote: (chiefComplaint: string, diagnosis: string, notes: string, labTests: string[], meds: any[]) => void;
  markNotificationsRead: () => void;
  addToast: (title: string, message: string, type?: 'info' | 'success' | 'alert') => void;
  
  // Selected Patient for EMR View
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  
  // AI Modal active report trigger
  activeLabForAiScan: LabRequestItem | null;
  setActiveLabForAiScan: (lab: LabRequestItem | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('landing');
  const [selectedPortalRole, setSelectedPortalRole] = useState<UserRole>('patient');
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(INITIAL_DEMO_ACCOUNTS);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  const [isDark, setIsDark] = useState<boolean>(false);
  
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [queue, setQueue] = useState<QueueToken[]>(INITIAL_QUEUE);
  const [patientProfile, setPatientProfile] = useState<PatientProfileData>(CURRENT_PATIENT_PROFILE);
  const [labRequests, setLabRequests] = useState<LabRequestItem[]>(INITIAL_LAB_REQUESTS);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [inventory, setInventory] = useState<MedicineInventory[]>(INITIAL_MEDICINE_INVENTORY);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-1042');
  const [activeLabForAiScan, setActiveLabForAiScan] = useState<LabRequestItem | null>(null);

  // Authentication logic
  const loginUser = (email: string, pass: string, targetPortalRole: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if account exists
    const account = userAccounts.find(u => u.email.toLowerCase() === cleanEmail);
    
    if (!account) {
      return { success: false, error: 'Email or password is incorrect.' };
    }

    // Password check (allow demo123 or matching pass)
    if (account.password && account.password !== pass && pass !== 'demo123') {
      return { success: false, error: 'Email or password is incorrect.' };
    }

    // ROLE VERIFICATION (REQUIREMENT #5)
    if (account.role !== targetPortalRole) {
      return { 
        success: false, 
        isRoleMismatch: true, 
        actualRole: account.role, 
        error: `This account is registered as a ${account.role.toUpperCase()}. Please select the ${account.role.toUpperCase()} Portal to continue.` 
      };
    }

    // Success login
    setCurrentUser(account);
    setRole(account.role);
    setSelectedPortalRole(account.role);
    addToast('Authentication Successful', `Welcome back, ${account.name}`, 'success');
    addAuditLog('User Login', `Authenticated to ${account.role.toUpperCase()} portal`, account.role, account.name);

    return { success: true };
  };

  const registerUser = (userData: Omit<UserAccount, 'id'>) => {
    const cleanEmail = userData.email.trim().toLowerCase();
    const existing = userAccounts.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const newAccount: UserAccount = {
      ...userData,
      id: `usr-${Date.now()}`
    };

    setUserAccounts(prev => [...prev, newAccount]);
    addToast('Account Created', `Created ${userData.role.toUpperCase()} account for ${userData.name}`, 'success');
    addAuditLog('User Registration', `Registered new account as ${userData.role.toUpperCase()}`, userData.role, userData.name);

    return { 
      success: true, 
      message: userData.role === 'patient' 
        ? 'Account created ✓ Please verify your email before accessing sensitive healthcare information.' 
        : 'Account created ✓ You can now sign in with your credentials.' 
    };
  };

  const logoutUser = () => {
    if (currentUser) {
      addAuditLog('User Logout', `Signed out of ${currentUser.role.toUpperCase()} portal`, currentUser.role, currentUser.name);
    }
    setCurrentUser(null);
    setRole('landing');
    addToast('Signed Out', 'You have been logged out safely.', 'info');
  };

  // Synchronize Dark Mode on HTML tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
      message,
      type,
      read: false,
      roleTarget: 'all'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addAuditLog = (action: string, details: string, roleName = 'System', user = 'User') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      role: roleName,
      user,
      action,
      details,
      badgeColor: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // 1. Book Appointment Action
  const bookAppointment = (
    doctorName: string, 
    date: string, 
    time: string, 
    type: 'Online Consultation' | 'In-Person Consultation', 
    reason: string
  ) => {
    const tokenNum = `#${28 + appointments.length}`;
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientName: 'Ananya Rao',
      patientAge: 28,
      patientGender: 'Female',
      doctorName,
      doctorSpecialty: doctorName.includes('Rahul') ? 'Cardiologist' : 'General Physician',
      doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      date,
      time,
      type,
      status: 'Scheduled',
      tokenNumber: tokenNum,
      roomNumber: 'Room 3',
      reason
    };

    setAppointments(prev => [newApt, ...prev]);

    // Add to Queue
    const newQToken: QueueToken = {
      id: `q-${tokenNum.replace('#', '')}`,
      tokenNumber: tokenNum,
      patientName: 'Ananya Rao',
      patientAge: 28,
      doctorName,
      department: 'Cardiology',
      status: 'Waiting',
      estimatedWaitMinutes: 35,
      arrivalTime: 'Just now'
    };
    setQueue(prev => [...prev, newQToken]);

    addToast('Appointment Confirmed', `Booked consultation with ${doctorName} for ${date} at ${time}.`, 'success');
    addAuditLog('Appointment Booked', `Ananya Rao scheduled ${type} with ${doctorName}. Token: ${tokenNum}`, 'Patient', 'Ananya Rao');
  };

  // 2. Call Next Patient in Queue
  const callNextPatientInQueue = () => {
    setQueue(prev => {
      const currentServingIndex = prev.findIndex(q => q.status === 'Serving');
      let nextIndex = -1;

      // Find next priority or waiting
      const priorityIndex = prev.findIndex(q => q.status === 'Priority');
      if (priorityIndex !== -1) {
        nextIndex = priorityIndex;
      } else {
        nextIndex = prev.findIndex(q => q.status === 'Waiting');
      }

      if (nextIndex === -1) return prev;

      return prev.map((item, idx) => {
        if (currentServingIndex !== -1 && idx === currentServingIndex) {
          return { ...item, status: 'Completed' as const };
        }
        if (idx === nextIndex) {
          addToast('Now Serving Token', `Token ${item.tokenNumber} (${item.patientName}) called to ${item.doctorName}.`, 'info');
          addAuditLog('Queue Token Called', `Token ${item.tokenNumber} called for ${item.patientName}.`, 'Receptionist', 'Staff R. Gupta');
          return { ...item, status: 'Serving' as const, estimatedWaitMinutes: 0 };
        }
        return item;
      });
    });
  };

  // 3. Update Queue Token Status
  const updateQueueTokenStatus = (id: string, status: QueueToken['status']) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    addAuditLog('Queue Status Updated', `Token #${id} set to ${status}.`, 'Receptionist', 'Reception Staff');
  };

  // 4. Update Laboratory Request Status
  const updateLabStatus = (id: string, status: LabRequestItem['status'], reportPdfName?: string) => {
    setLabRequests(prev => prev.map(lab => {
      if (lab.id === id) {
        const updated = { ...lab, status };
        if (reportPdfName) updated.reportPdfName = reportPdfName;
        return updated;
      }
      return lab;
    }));

    if (status === 'Report Ready') {
      addToast('Lab Report Verified', `CBC & Pathology report for Ananya Rao is now digitalized and available in EMR.`, 'success');
      addAuditLog('Lab Report Released', `Lab item #${id} marked as Report Ready. Digital PDF signed.`, 'Laboratory', 'Tech S. Verma');
    } else {
      addAuditLog('Lab Status Updated', `Lab request #${id} updated to ${status}.`, 'Laboratory', 'Tech S. Verma');
    }
  };

  // 5. Fulfill Prescription in Pharmacy
  const fulfillPrescription = (id: string) => {
    let targetPrescription: Prescription | undefined;
    setPrescriptions(prev => prev.map(p => {
      if (p.id === id) {
        targetPrescription = p;
        return { ...p, status: 'Fulfilled' as const };
      }
      return p;
    }));

    // Deduct inventory
    if (targetPrescription) {
      targetPrescription.medicines.forEach(m => {
        setInventory(invList => invList.map(inv => {
          if (inv.name.toLowerCase().includes(m.name.toLowerCase().split(' ')[0])) {
            const newStock = Math.max(0, inv.stock - m.quantity);
            return { 
              ...inv, 
              stock: newStock, 
              status: newStock < inv.reorderLevel ? 'Low Stock' : 'In Stock' 
            };
          }
          return inv;
        }));
      });
    }

    addToast('Prescription Fulfilled', `Prescription #${id} dispensed successfully. Stock deducted.`, 'success');
    addAuditLog('Prescription Fulfilled', `Dispensed prescription #${id} for ${targetPrescription?.patientName || 'Patient'}.`, 'Pharmacist', 'Pharm. M. Joshi');
  };

  // 6. Pay Billing Invoice
  const payInvoice = (id: string, method: 'UPI' | 'Card' | 'Net Banking') => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: 'Paid' as const,
          paymentMethod: method,
          paidAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
        };
      }
      return inv;
    }));

    addToast('Payment Received', `Invoice #${id} settled via ${method}. Receipt sent to patient.`, 'success');
    addAuditLog('Invoice Payment Processed', `Invoice ${id} marked as Paid using ${method}.`, 'Billing', 'Billing Desk');
  };

  // 7. Doctor Record Medical Visit Note
  const addMedicalVisitNote = (
    chiefComplaint: string,
    diagnosis: string,
    notes: string,
    labTests: string[],
    meds: any[]
  ) => {
    const newVisitId = `vis-${Date.now()}`;
    const newVisit = {
      id: newVisitId,
      date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
      doctorName: 'Dr. Rahul Rao',
      specialty: 'Cardiology',
      type: 'Routine OPD Consultation',
      chiefComplaint,
      diagnosis,
      clinicalNotes: notes,
      vitals: {
        bloodPressure: '120/78 mmHg',
        heartRate: 76,
        temperature: '98.6 °F',
        spO2: 99,
        weightKg: 58,
        bloodGroup: 'O+',
        bmi: 21.3
      },
      labRequests: labTests,
      prescriptionId: meds.length > 0 ? `pres-${Date.now()}` : undefined
    };

    setPatientProfile(prev => ({
      ...prev,
      visits: [newVisit, ...prev.visits]
    }));

    // If new labs ordered, push to lab requests
    labTests.forEach(test => {
      const newLabReq: LabRequestItem = {
        id: `lab-${Date.now()}-${Math.floor(Math.random()*100)}`,
        testName: test,
        category: 'Cardio-Hematology',
        patientName: patientProfile.name,
        patientAge: patientProfile.age,
        patientGender: patientProfile.gender,
        doctorName: 'Dr. Rahul Rao',
        dateRequested: 'Today',
        status: 'Requested',
        urgent: false,
        sampleType: 'Venous Blood'
      };
      setLabRequests(prev => [newLabReq, ...prev]);
    });

    addToast('EMR Record Saved', `Consultation notes and digital chart updated for ${patientProfile.name}.`, 'success');
    addAuditLog('Medical Record Updated', `Dr. Rao recorded diagnosis "${diagnosis}" for ${patientProfile.name}.`, 'Doctor', 'Dr. Rahul Rao');
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      selectedPortalRole,
      setSelectedPortalRole,
      currentUser,
      loginUser,
      registerUser,
      logoutUser,
      isDark,
      toggleDarkMode,
      appointments,
      queue,
      patientProfile,
      labRequests,
      prescriptions,
      inventory,
      invoices,
      auditLogs,
      notifications,
      bookAppointment,
      callNextPatientInQueue,
      updateQueueTokenStatus,
      updateLabStatus,
      fulfillPrescription,
      payInvoice,
      addMedicalVisitNote,
      markNotificationsRead,
      addToast,
      selectedPatientId,
      setSelectedPatientId,
      activeLabForAiScan,
      setActiveLabForAiScan
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
