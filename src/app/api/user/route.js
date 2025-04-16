import { NextResponse } from 'next/server';
import data from '@/data/mockUserData.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const section = searchParams.get('section');

  const user = data[username];

  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  // Si se pide una sección específica
  if (section) {
    if (!user[section]) {
      return NextResponse.json({ error: 'Sección no encontrada' }, { status: 404 });
    }
    return NextResponse.json(user[section]);
  }

  // Buscar secciones tipo fotos y extraer name + primera imagen de cada álbum
  const fotosPreview = Object.entries(user)
    .filter(([_, value]) =>
      value && typeof value === 'object' && !Array.isArray(value) && value.type === 'fotos'
    )
    .map(([key, value]) => {
      const albumPreviews = value.data?.albums?.map(album => ({
        image: album.photos?.[0]?.src || null
      })) || [];

      return {
        key,
        name: value.name || null,
        albums: albumPreviews
      };
    });

  const result = {
    ...user.home,
    preview: {
      fotos: fotosPreview
    }
  };

  return NextResponse.json(result);
}
