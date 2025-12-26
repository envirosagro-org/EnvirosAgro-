import React from 'react';
import { PlayCircle, Mic, FileText } from 'lucide-react';

interface MediaListProps {
  mediaItems: any[];
  onSelect: (media: any) => void;
  title: string;
}

export const MediaList: React.FC<MediaListProps> = ({ mediaItems, onSelect, title }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Mic size={20} fill="currentColor" />;
      case 'article':
        return <FileText size={20} fill="currentColor" />;
      default:
        return <PlayCircle size={20} fill="currentColor" />;
    }
  };

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-earth-900 dark:text-white mb-8">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mediaItems.map((media) => (
          <div 
            key={media.id} 
            className="group cursor-pointer"
            onClick={() => onSelect(media)}
          >
            <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
              <img src={media.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={media.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4">
                <div className="bg-white text-black p-3 rounded-full shadow-lg">
                  {getIcon(media.type)}
                </div>
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold">{media.duration}</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-agro-600">{media.category}</span>
            <h4 className="text-lg font-bold text-earth-900 dark:text-white mt-1 group-hover:text-agro-600 transition-colors">{media.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
