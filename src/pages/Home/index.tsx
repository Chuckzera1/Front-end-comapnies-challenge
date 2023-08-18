import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/button';
import { Table } from '../../components/molecules/Table';

const mockedData = [
  {
    song: 'The Sliding Mr. Bones (Next Stop, Pottersville)',
    artist: 'Malcolm Lockyer',
    year: '1961',
  },
  {
    song: 'The Sliding Mr. Bones (Next Stop, Pottersville)',
    artist: 'Malcolm Lockyer',
    year: '1961',
  },
  {
    song: 'The Sliding Mr. Bones (Next Stop, Pottersville)',
    artist: 'Malcolm Lockyer',
    year: '1961',
  },
];

export const Home = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-3xl mb-10">Company Challenge</div>
      <div className="flex justify-between mb-6">
        <Input placeholder="Pesquisar" />
        <Button children="Novo Usuário" />
      </div>
      <div className="w-full h-full flex self-center">
        <Table data={mockedData} keys={['song', 'artist', 'year']} />
      </div>
    </div>
  );
};
