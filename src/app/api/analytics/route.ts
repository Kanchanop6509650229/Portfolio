import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const forwardedFor = req.headers.get('x-forwarded-for');
    const userAgent = req.headers.get('user-agent');
    const referer = req.headers.get('referer');

    const analytics = await prisma.analytics.create({
      data: {
        pageUrl: data.pageUrl,
        visitorIp: forwardedFor?.split(',')[0] || 'unknown',
        userAgent: userAgent || 'unknown',
        referrer: referer || 'direct',
        deviceType: getUserDevice(userAgent || ''),
        countryCode: data.countryCode || 'unknown',
      }
    });

    return NextResponse.json({ success: true, id: analytics.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const analytics = await prisma.analytics.findMany({
      orderBy: { visitDate: 'desc' },
      take: 1000, // Last 1000 visits
    });

    const summary = {
      totalVisits: await prisma.analytics.count(),
      uniqueVisitors: await prisma.analytics.groupBy({
        by: ['visitorIp'],
        _count: true,
      }).then(result => result.length),
      topPages: await prisma.analytics.groupBy({
        by: ['pageUrl'],
        _count: true,
        orderBy: {
          _count: {
            pageUrl: 'desc',
          },
        },
        take: 10,
      }),
      deviceBreakdown: await prisma.analytics.groupBy({
        by: ['deviceType'],
        _count: true,
      }),
    };

    return NextResponse.json({ analytics, summary });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

function getUserDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'mobile';
  if (/tablet/i.test(userAgent)) return 'tablet';
  return 'desktop';
}