export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-emerald-800 py-1 text-sm">
      <div className="container text-center text-white">
        <p>&copy; {year} Programming Courses</p>
      </div>
    </footer>
  );
}
