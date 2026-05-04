// Simple in-memory storage for appointments (replace with database in production)
const appointments = new Map();

// Business hours configuration
const BUSINESS_HOURS = {
  1: { open: 8, close: 17 },  // Monday
  2: { open: 8, close: 17 },  // Tuesday
  3: { open: 8, close: 17 },  // Wednesday
  4: { open: 8, close: 17 },  // Thursday
  5: { open: 8, close: 17 },  // Friday
  6: { open: 8, close: 12 },  // Saturday
  0: null,  // Sunday - Closed
};

// Service durations in minutes
const SERVICE_DURATIONS = {
  'Oil Change': 30,
  'Inspection': 45,
  'Brake Repair': 60,
  'A/C Repair': 90,
  'Engine Diagnostics': 60,
  'Transmission': 120,
  'Hybrid Battery': 90,
  'General Service': 60,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  
  if (!date) {
    return Response.json({ error: 'Date required' }, { status: 400 });
  }
  
  const availableSlots = getAvailableSlots(new Date(date));
  return Response.json({ slots: availableSlots });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, phone, email, service, date, time, vehicle, notes } = body;
  
  // Validate required fields
  if (!name || !phone || !service || !date || !time) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // Check if slot is still available
  const slotKey = `${date}_${time}`;
  if (appointments.has(slotKey)) {
    return Response.json({ error: 'Slot no longer available' }, { status: 409 });
  }
  
  // Create appointment
  const appointment = {
    id: Date.now().toString(),
    name,
    phone,
    email: email || '',
    service,
    date,
    time,
    vehicle: vehicle || '',
    notes: notes || '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  
  appointments.set(slotKey, appointment);
  
  // Here you would typically:
  // 1. Send email to Steve
  // 2. Send confirmation email to customer
  // 3. Add to Google Calendar
  // 4. Send SMS notification
  
  return Response.json({ 
    success: true, 
    appointment,
    message: 'Appointment booked successfully!' 
  });
}

function getAvailableSlots(date: Date) {
  const day = date.getDay();
  const hours = BUSINESS_HOURS[day];
  
  if (!hours) return []; // Closed
  
  const slots = [];
  const dateStr = date.toISOString().split('T')[0];
  
  for (let hour = hours.open; hour < hours.close; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const slotKey = `${dateStr}_${timeStr}`;
      
      if (!appointments.has(slotKey)) {
        slots.push({
          time: timeStr,
          available: true,
        });
      }
    }
  }
  
  return slots;
}

// Admin endpoint to view all appointments
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const adminKey = searchParams.get('adminKey');
  
  // Simple admin auth (replace with proper auth in production)
  if (adminKey !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const allAppointments = Array.from(appointments.values());
  return Response.json({ appointments: allAppointments });
}