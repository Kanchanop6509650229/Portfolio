import { Card } from '@/components/ui/Card';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import { FiMail, FiClock, FiUser } from 'react-icons/fi';

const prisma = new PrismaClient();

async function getMessages() {
  return await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          Messages Inbox
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.map((message) => (
          <Card key={message.id} className="p-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  <span>{message.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  <a href={`mailto:${message.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {message.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <span>{format(new Date(message.createdAt), 'PPp')}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Mark as Read
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}