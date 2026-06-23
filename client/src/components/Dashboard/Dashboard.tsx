import { useItems } from '../../hooks/use-items';
import KanbanBoard from './KanbanBoard';

function Dashboard() {
  const { data, isLoading, error } = useItems();

  if (isLoading) return <p>Henter...</p>;
  if (error) return <p>Noget gik galt</p>;

  return <KanbanBoard items={data || []} />;
}

export default Dashboard;
