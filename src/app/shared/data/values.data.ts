import { Toolbar } from "ngx-editor";
import { ThemeData } from "src/app/models";

export enum AppValues {
    darkMode = 'dark-mode',
    tasks = "tasks",
    tags = "tags",
    notes = "notes",
    themes = "themes",
    edit = 'edit',
    create = 'create',
    delete = 'delete',
    defaultTagColor = '#344d3a',
};

export const DP_THEMES: ThemeData = {
  selectedTheme: {
    name: 'Golden',
    keyValue: 'golden-theme',
    primary: '#FFDE59',
    accent: '#deb200',
    darkMode: false
  },
  availableThemes: [
    {
      name: 'Golden',
      keyValue: 'golden-theme',
      primary: '#FFDE59',
      accent: '#deb200',
      darkMode: false
    },
    {
        name: 'Purple-Amber',
        keyValue: 'purple-amber-theme',
        primary: '#673ab7',
        accent: '#ffc107',
        darkMode: false
    },
    {
        name: 'Indigo-pink',
        keyValue: 'indigo-pink-theme',
        primary: '#3f51b5',
        accent: '#e91e63',
        darkMode: false
    },
  ]
}

export const TEXT_EDITOR_CONFIG: Toolbar = [
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

export const COLORS = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', 
'#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986',  
'#999999', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#AEA1FF', '#FDA1FF', 
'#808080', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', 
'#666666', '#9F0500', '#C45100', '#FB9E00', '#808900', '#0C797D', '#0062B1', '#653294', '#AB149E'];