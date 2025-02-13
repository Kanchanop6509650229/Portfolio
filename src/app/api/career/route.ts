import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      orderBy: { startDate: 'desc' }
    });
    return NextResponse.json(careers);
  } catch (error) {
    console.error('Error fetching career experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch career experiences' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const career = await prisma.career.create({
      data: {
        company: data.company,
        position: data.position,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description,
        current: data.current
      }
    });
    return NextResponse.json(career);
  } catch (error) {
    console.error('Error creating career experience:', error);
    return NextResponse.json({ error: 'Failed to create career experience' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const career = await prisma.career.update({
      where: { id: data.id },
      data: {
        company: data.company,
        position: data.position,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description,
        current: data.current
      }
    });
    return NextResponse.json(career);
  } catch (error) {
    console.error('Error updating career experience:', error);
    return NextResponse.json({ error: 'Failed to update career experience' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('ID is required');
    
    await prisma.career.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting career experience:', error);
    return NextResponse.json({ error: 'Failed to delete career experience' }, { status: 500 });
  }
}