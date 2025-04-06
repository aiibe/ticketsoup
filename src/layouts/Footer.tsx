export default function Footer() {
  return (
    <footer className="bg-card h-[36px] border-t p-2">
      <p className="text-muted-foreground text-center text-sm">
        &copy; {new Date().getFullYear()} TicketSoup. All rights reserved
      </p>
    </footer>
  );
}
