interface DashboardProps {
  url?: string;
  title?: string;
  className?: string;
}

export const Dashboard = ({ url, title, className }: DashboardProps) => (
  <iframe
    src={url}
    title={title || "Grafana Dashboard"}
    className={className}
    allowFullScreen
  />
);
