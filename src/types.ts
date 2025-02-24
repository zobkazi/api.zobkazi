
// Define the User interface
interface IUser  {
    name: string;
    username?: string;
    email: string;
    password: string;
    role: "user" | "admin";
    login?: string;
    id: number;
    node_id?: string;
    avatar_url?: string;
    gravatar_id?: string;
    url?: string;
    html_url?: string;
    linkedin_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type: string;
    site_admin: boolean;
    company?: string;
    blog?: string;
    location?: string;
    hireable: boolean;
    bio?: string;
    twitter_username?: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
  }
  
  

  export default IUser;