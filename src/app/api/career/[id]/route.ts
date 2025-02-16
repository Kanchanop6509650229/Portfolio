import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  _request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const id = params.id;
    const career = await prisma.career.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!career) {
      return NextResponse.json({ error: 'Career entry not found' }, { status: 404 });
    }
    return NextResponse.json(career);
  } catch (error) {
    console.error('Error fetching career:', error);
    return NextResponse.json({ error: 'Failed to fetch career' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const id = params.id;
    const data = await request.json();
    const career = await prisma.career.update({
      where: { id: parseInt(id) },
      data: {
        degree: data.degree,
        university: data.university,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description
      }
    });
    return NextResponse.json(career);
  } catch (error) {
    console.error('Error updating career:', error);
    return NextResponse.json({ error: 'Failed to update career' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const id = params.id;
    await prisma.career.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting career:', error);
    return NextResponse.json({ error: 'Failed to delete career' }, { status: 500 });
  }
}