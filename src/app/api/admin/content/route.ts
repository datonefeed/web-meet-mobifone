import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const VI_FILE_PATH = path.join(process.cwd(), 'src/i18n/messages/vi.json');
const EN_FILE_PATH = path.join(process.cwd(), 'src/i18n/messages/en.json');

export async function GET() {
  try {
    const viFileContents = await fs.readFile(VI_FILE_PATH, 'utf8');
    const enFileContents = await fs.readFile(EN_FILE_PATH, 'utf8');
    const viData = JSON.parse(viFileContents);
    const enData = JSON.parse(enFileContents);
    
    return NextResponse.json({
      vi: viData,
      en: enData
    });
  } catch (error) {
    console.error('Error reading data files:', error);
    return NextResponse.json(
      { error: 'Failed to read data files' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { vi, en } = await request.json();
    if (!vi || !en) {
      return NextResponse.json(
        { error: 'Both Vietnamese and English data are required' },
        { status: 400 }
      );
    }
    
    
    await Promise.all([
      fs.writeFile(VI_FILE_PATH, JSON.stringify(vi, null, 2), 'utf8'),
      fs.writeFile(EN_FILE_PATH, JSON.stringify(en, null, 2), 'utf8')
    ]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing data files:', error);
    return NextResponse.json(
      { error: 'Failed to write data files' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { vi, en, language } = await request.json();
    
    if (language === 'vi' && vi) {
      const viFileContents = await fs.readFile(VI_FILE_PATH, 'utf8');
      const currentViData = JSON.parse(viFileContents);
      const updatedViData = { ...currentViData, ...vi };
      
      await fs.writeFile(VI_FILE_PATH, JSON.stringify(updatedViData, null, 2), 'utf8');
    }
    
    if (language === 'en' && en) {
      
      const enFileContents = await fs.readFile(EN_FILE_PATH, 'utf8');
      const currentEnData = JSON.parse(enFileContents);
      
      
      const updatedEnData = { ...currentEnData, ...en };
      
      
      await fs.writeFile(EN_FILE_PATH, JSON.stringify(updatedEnData, null, 2), 'utf8');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating data files:', error);
    return NextResponse.json(
      { error: 'Failed to update data files' },
      { status: 500 }
    );
  }
}