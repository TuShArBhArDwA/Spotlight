import PageHeader from '@/components/ReusableComponent/PageHeader';
import { Webcam, GitFork, Users } from 'lucide-react';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { leadData } from './__tests__/data';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="w-full flex flex-col">
        <PageHeader
          leftIcon={<Webcam className="w-3 h-3" />}
          mainIcon={<Users className="w-12 h-12" />}
          rightIcon={<GitFork className="w-3 h-3" />}
          heading="The home to all your customers"
          placeholder="Search customer..."
        />
      </div>

      <div className="flex-grow overflow-y-auto mt-6"> 
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm text-muted-foreground">Name</TableHead>
              <TableHead className="text-sm text-muted-foreground">Email</TableHead>
              <TableHead className="text-sm text-muted-foreground">Phone</TableHead>
              <TableHead className="text-right text-sm text-muted-foreground">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadData?.map((lead, idx) => (
              <TableRow key={idx} className="border-0">
                <TableCell className="font-medium">{lead?.name}</TableCell>
                <TableCell>{lead?.email}</TableCell>
                <TableCell>{lead?.phone}</TableCell>
                <TableCell className="text-right">
                  {lead?.tags?.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
