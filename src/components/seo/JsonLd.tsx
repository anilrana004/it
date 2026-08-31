type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: Props) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
