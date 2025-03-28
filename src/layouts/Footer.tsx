export default function Footer() {
  return (
    <footer className="border-t border-t-gray-300 p-2">
      <p className="text-muted-foreground text-center text-sm">
        &copy; {new Date().getFullYear()} TicketSoup. All rights reserved
      </p>
    </footer>
  );
}
