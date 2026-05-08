export const getProductEmoji = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('мёд')) return '🫙';
  if (n.includes('чай') && n.includes('лесной')) return '🌿';
  if (n.includes('иван-чай') || n.includes('иван чай')) return '🫖';
  if (n.includes('масло ши')) return '🧴';
  if (n.includes('полба')) return '🌾';
  if (n.includes('мыло')) return '🧼';
  if (n.includes('розовая')) return '🌸';
  if (n.includes('джем')) return '🫐';
  if (n.includes('биогумус')) return '🪴';
  if (n.includes('миндаль') || n.includes('паста')) return '🥜';
  if (n.includes('мочалка')) return '🧽';
  if (n.includes('подсолнечника')) return '🌻';
  return '🌿';
};

export const getCategoryByName = (name: string): string => {
  if (name.includes('мёд') || name.includes('чай') || name.includes('джем') ||
      name.includes('полба') || name.includes('паста') || name.includes('иван')) return 'Питание';
  if (name.includes('масло ши') || name.includes('розовая') || name.includes('подсолнечника')) return 'Косметика';
  if (name.includes('мыло') || name.includes('мочалка')) return 'Дом';
  if (name.includes('биогумус')) return 'Растения';
  return 'Питание';
};