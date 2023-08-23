import { parseISO, format, formatRelative, isYesterday, isToday } from 'date-fns';


interface Props {
  dateString: string
}

export default function FormatDate({ dateString }: Props) {
  const date = parseISO(dateString);
  
  let formatedDate 
  if (isToday(date)) {
    formatedDate = formatRelative(date, new Date())
  } else if (isYesterday(date)) {
    formatedDate = formatRelative(date, new Date())
  } else {
    formatedDate = format(date, 'LLL d yyyy, h:m a')
  }
  

  return <time dateTime={dateString}>{formatedDate}</time>;
}