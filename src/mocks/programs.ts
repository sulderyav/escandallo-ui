import mock from "src/utils/mock";
import type { Project } from "src/models/project";
import { subDays } from "date-fns";

let projects: Project[] = [
  {
    id: "1",
    name: "Cumbre Pronaca",
    screenshot: "/static/images/placeholders/fitness/1.jpg",
    description: "Proin interdum mauris non ligula pellentesque ultrices.",
    tags: ["Software"],
    startDate: subDays(new Date(), 1).getTime(),
    dueDate: subDays(new Date(), 3).getTime(),
    memberIds: [
      {
        id: "1",
        name: "Lauree MacFadzean 2",
        avatar: "/static/images/avatars/1.jpg",
      },
      {
        id: "2",
        name: "Darice Malyon",
        avatar: "/static/images/avatars/2.jpg",
      },
      {
        id: "3",
        name: "Dwain Culpan",
        avatar: "/static/images/avatars/3.jpg",
      },
      {
        id: "4",
        name: "Carleton Henric",
        avatar: "/static/images/avatars/4.jpg",
      },
      {
        id: "5",
        name: "Dillie Considine",
        avatar: "/static/images/avatars/5.jpg",
      },
    ],
    progress: 56,
    status: "completed",
  },
  {
    id: "2",
    name: "Socio Adelca",
    screenshot: "/static/images/placeholders/fitness/2.jpg",
    description:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    tags: ["Backend"],
    startDate: subDays(new Date(), 2).getTime(),
    dueDate: subDays(new Date(), 5).getTime(),
    memberIds: [
      {
        id: "1",
        name: "Lauree MacFadzean",
        avatar: "/static/images/avatars/1.jpg",
      },
      {
        id: "3",
        name: "Dwain Culpan",
        avatar: "/static/images/avatars/3.jpg",
      },
    ],
    progress: 45,
    status: "not_started",
  },
  {
    id: "3",
    name: "Conti Club",
    screenshot: "/static/images/placeholders/fitness/3.jpg",
    description:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    tags: ["Development", "Software"],
    startDate: subDays(new Date(), 3).getTime(),
    dueDate: subDays(new Date(), 4).getTime(),
    memberIds: [
      {
        id: "1",
        name: "Lauree MacFadzean",
        avatar: "/static/images/avatars/1.jpg",
      },
      {
        id: "5",
        name: "Dillie Considine",
        avatar: "/static/images/avatars/5.jpg",
      },
    ],
    progress: 35,
    status: "completed",
  },
  {
    id: "4",
    name: "Héroes Pronaca 2021",
    screenshot: "/static/images/placeholders/fitness/4.jpg",
    description:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    tags: ["Design Project"],
    startDate: subDays(new Date(), 4).getTime(),
    dueDate: subDays(new Date(), 8).getTime(),
    memberIds: [
      {
        id: "2",
        name: "Darice Malyon",
        avatar: "/static/images/avatars/2.jpg",
      },
      {
        id: "4",
        name: "Carleton Henric",
        avatar: "/static/images/avatars/4.jpg",
      },
      {
        id: "3",
        name: "Dwain Culpan",
        avatar: "/static/images/avatars/3.jpg",
      },
    ],
    progress: 76,
    status: "in_progress",
  },
  {
    id: "5",
    name: "Plan Conquista",
    screenshot: "/static/images/placeholders/fitness/1.jpg",
    description:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    tags: ["UX", "Marketing Research"],
    startDate: subDays(new Date(), 5).getTime(),
    dueDate: subDays(new Date(), 15).getTime(),
    memberIds: [
      {
        id: "1",
        name: "Lauree MacFadzean",
        avatar: "/static/images/avatars/1.jpg",
      },
      {
        id: "2",
        name: "Darice Malyon",
        avatar: "/static/images/avatars/2.jpg",
      },
    ],
    progress: 15,
    status: "in_progress",
  },
  {
    id: "6",
    name: "Socio Maestro",
    screenshot: "/static/images/placeholders/fitness/2.jpg",
    description:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    tags: ["Frontend", "Marketing"],
    startDate: subDays(new Date(), 6).getTime(),
    dueDate: subDays(new Date(), 12).getTime(),
    memberIds: [
      {
        id: "1",
        name: "Lauree MacFadzean",
        avatar: "/static/images/avatars/1.jpg",
      },
      {
        id: "2",
        name: "Darice Malyon",
        avatar: "/static/images/avatars/2.jpg",
      },
      {
        id: "3",
        name: "Dwain Culpan",
        avatar: "/static/images/avatars/3.jpg",
      },
      {
        id: "4",
        name: "Carleton Henric",
        avatar: "/static/images/avatars/4.jpg",
      },
      {
        id: "5",
        name: "Dillie Considine",
        avatar: "/static/images/avatars/5.jpg",
      },
    ],
    progress: 98,
    status: "in_progress",
  },
  {
    id: "7",
    name: "Ponte Pilas Adelca",
    screenshot: "/static/images/placeholders/fitness/3.jpg",
    description: "Fusce consequat. Nulla nisl. Nunc nisl.",
    tags: ["UX", "React", "Software"],
    startDate: subDays(new Date(), 7).getTime(),
    dueDate: subDays(new Date(), 22).getTime(),
    memberIds: [
      {
        id: "1",
        name: "Lauree MacFadzean",
        avatar: "/static/images/avatars/1.jpg",
      },
      {
        id: "3",
        name: "Dwain Culpan",
        avatar: "/static/images/avatars/3.jpg",
      },
      {
        id: "2",
        name: "Darice Malyon",
        avatar: "/static/images/avatars/2.jpg",
      },
      {
        id: "5",
        name: "Dillie Considine",
        avatar: "/static/images/avatars/5.jpg",
      },
    ],
    progress: 76,
    status: "in_progress",
  },
];

mock.onGet("/programs").reply(() => {
  return [200, { projects }];
});
