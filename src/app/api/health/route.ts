import { NextResponse } from 'next/server';

/**
 * Health check endpoint for container orchestration
 * @returns Response with health status
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    },
    {
      status: 200,
    }
  );
}
