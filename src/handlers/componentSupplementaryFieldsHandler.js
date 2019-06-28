import type Documentation from '../Documentation';

export default function fieldHandler(documentation: Documentation) {
  const description = documentation.get('description');
  const fields = description.split('\n').filter(line => line.includes('@'));

  fields.forEach(field => {
    if (field.includes(' ')) {
      documentation.set(
        field.substring(1, field.indexOf(' ')),
        field.substring(field.indexOf(' ') + 1),
      );
    } else {
      documentation.set(field.substring(1), true);
    }
  });
  documentation.set(
    'description',
    description.replace(/^(?!@ignore)@\S+.*$/gm, '').trim() || '',
  );
}
