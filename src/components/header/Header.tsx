interface IHeaderProps {
  siteName: string;
  siteCreator: string;
}

const Header = (props: IHeaderProps) => (
  <header>
    <h1> Welcome to {props.siteName}!</h1>
    <h4>Developed by {props.siteCreator}</h4>
  </header>
)

export default Header;