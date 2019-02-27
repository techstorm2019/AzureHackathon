import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderItems from "./header-items";
import NavItems from "../../constants/Nav-items";
import CDNEndpoint from "../../constants/CDN-endpoint";
import NotificationDropDown from "./notification-dropdown";
import './notification.css';

/**
 * Component that alerts if you click outside of it
 */
class OutsideClick extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            clicked: false
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({clicked: true});
            this.props.hideDropdown();
        } else {
            this.setState({clicked: false});
        }
    }

    render() {
        return (
            <div ref={this.setWrapperRef} className={"dropdown-wrapper"}>
                {this.props.children}
            </div>
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: NavItems.DASHBOARD,
            activeUpload: true,
            activeInventory: false,
            activeProposals: false,
            activeManage: false,
            activeAdmin: false,
            activeProfile: false,
            activeApps: false,
            profileDropdown: false,
            appsDropdown: false,
            adminDropdown: false,
            pageLoading: false,
            activeRole: 0,

            // variables for pagination
            result: [],
            totalRecords: 0,
            dataLimit: 5,
            startIndex: 1,
            pageNumber: 1,
            endIndex: 5,
            disablePre: true,
            disableNext: false,

            searchSwitcher: '',
            noApp: false,
            viewAllAppsUrl: '',
            AppSwitcherContent: null,
            AppSwitcherTrim: []
        }
    }

    componentWillMount() {
        let currentLocation = window.location.pathname.split("/")[1];
        (currentLocation === "") ? this.activeNav("User Management", "dashboard") : this.activeNav("User Management", currentLocation);
    }

    launch = (e, ApplicationURL) => {
        e.preventDefault();
        window.location = ApplicationURL;
    };

    searchSwitcher = (e) => {
        e.preventDefault();
        let storeApplicationName = [], searchValue = e.target.value.toUpperCase(), searchName = e.target.name,
            AppSwitcher = [], AppSwitcherLi = [], AppSwitcherUl, i, g = -1;
        this.setState({
            [searchName]: e.target.value
        });
        if (this.state.result.length > 0) {
            this.state.result.forEach((v) => {
                if (v.ApplicationName.toUpperCase().includes(searchValue)) {
                    storeApplicationName.push(v);
                }
            });

            for (i = 0; i <= storeApplicationName.length; i += 4) {
                /*mapCallBack(i, that);*/

                AppSwitcherUl = <div key={g} className={"apps-by-category home"}>
                    <ul>
                        {AppSwitcherLi}
                    </ul>
                </div>;

                AppSwitcherLi = [];
                g = AppSwitcher.length;
                AppSwitcher[g] = AppSwitcherUl;
            }

            this.setState({
                AppSwitcherTrim: storeApplicationName.length > 0 ? AppSwitcher : 'Result not found!'
            })
        }
    };

    collapseDropdown = (item) => {
        if (item === 'profile') {
            this.setState({
                profileDropdown: false,
                activeProfile: false
            });
        } else if (item === 'apps') {
            this.setState({
                appsDropdown: false,
                activeApps: false
            });
        } else if (item === NavItems.ADMIN) {
            this.setState({
                adminDropdown: false
            });

            if (this.state.activePage !== NavItems.ADMIN) {
                this.setState({
                    activeAdmin: false
                });
            }
        }
    };

    activeNav = (e, item) => {
        if (item === 'upload') {
            this.setState({
                activePage: 'upload',
                activeUpload: true,
                activeInventory: false,
                activeProposals: false,
                activeManage: false,
                activeAdmin: false
            });
        } else if (item === NavItems.DASHBOARD) {
            this.setState({
                activePage: NavItems.DASHBOARD,
                activeUpload: false,
                activeInventory: true,
                activeProposals: false,
                activeManage: false,
                activeAdmin: false
            });
        } else if (item === NavItems.SHIPMENT) {
            this.setState({
                activePage: NavItems.SHIPMENT,
                activeUpload: false,
                activeInventory: false,
                activeProposals: true,
                activeManage: false,
                activeAdmin: false
            });
        } else if (item === NavItems.MANAGE) {
            this.setState({
                activePage: NavItems.MANAGE,
                activeUpload: false,
                activeInventory: false,
                activeProposals: false,
                activeManage: true,
                activeAdmin: false
            });
        } else if (item === NavItems.ADMIN) {
            this.setState({
                activePage: NavItems.ADMIN,
                activeUpload: false,
                activeInventory: false,
                activeProposals: false,
                activeManage: false,
                activeAdmin: true,
                adminDropdown: false
            });
        }
    };

    getNavItemClass(item) {
        if (this.props.accessItems.includes(item) || item === 'profile' || item === 'apps') {
            if (item === NavItems.DASHBOARD) return (this.state.activeInventory) ? 'nav-item active' : 'nav-item';
            else if (item === NavItems.SHIPMENT) return (this.state.activeProposals) ? 'nav-item active' : 'nav-item';
            else if (item === NavItems.MANAGE) return (this.state.activeManage) ? 'nav-item active' : 'nav-item';
            else if (item === NavItems.ADMIN) return (this.state.activeAdmin) ? 'nav-item dropdown active' : 'nav-item dropdown';
            else if (item === 'profile') return (this.state.activeProfile) ? 'icon-button active' : 'icon-button';
            else if (item === 'apps') return (this.state.activeApps) ? 'icon-button active' : 'icon-button';
        } else {
            return 'hidden';
        }
    }

    toggleDropdown(item, event) {
        event.preventDefault();
        if (item === 'profile') {
            this.setState({
                profileDropdown: !this.state.profileDropdown,
                activeProfile: !this.state.activeProfile
            });
        } else if (item === 'apps') {
            this.setState({
                activeApps: !this.state.activeApps,
                appsDropdown: !this.state.appsDropdown
            });
        } else if (item === NavItems.ADMIN) {
            this.setState({
                adminDropdown: !this.state.adminDropdown
            });

            if (this.state.activePage !== NavItems.ADMIN) {
                this.setState({
                    activeAdmin: !this.state.activeAdmin
                });
            }
        }
    }

    hideAppSwitcher = () => {
        this.setState({
            appsDropdown: !this.state.appsDropdown,
            activeApps: !this.state.activeApps
        })
    };

    getDropdown(item) {
        return (item === 'profile' && this.state.profileDropdown) ? {display: 'block'} :
            ((item === 'admin' && this.state.adminDropdown) ? {display: 'block'} :
                ((item === 'apps' && this.state.appsDropdown) ? {display: 'block'} : {display: 'none'}));
    }

    getUserImage = (size) => {
        if (size === "small")
            return (
                <img className="fa user-profile-photo"
                     src={CDNEndpoint + "/images/icons/DefaultProfileImg32.png"}
                     alt="profile"/>
            );
        else
            return (
                <img src={CDNEndpoint + "/images/icons/DefaultProfileImg64.png"}
                     alt="profile"/>
            );
    };

    viewAllApps = () => {
        window.location = this.state.viewAllAppsUrl;
    };

    startLoading = () => {
        this.setState({
            pageLoading: true
        });
    };

    endLoading = () => {
        this.setState({
            pageLoading: false
        });
    };

    logout = (e) => {
        e.preventDefault();
        let logOutUrl = window.location.origin + "/User/SignOut/";
        window.location = logOutUrl;
    };

    render() {
        const notifications = this.props.notificationItems;
        return (
            <header className="ds-header app-logged-in">
                <nav className="navbar large-nav-menu">
                    <Link to="/" className="navbar-brand" onClick={(e) => this.activeNav(e, NavItems.DASHBOARD)}>
                        <img src={CDNEndpoint + "/images/logos/DamcoPortal.svg"}
                             alt="Logo - Maersk" width={32} height={32}/>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav">
                            {
                                HeaderItems.map((item, index) => {
                                    if (item.link === "#") {
                                        return (
                                            <li className={this.getNavItemClass(item.activeNav)} key={`item-${index}`}>
                                                <OutsideClick
                                                    hideDropdown={() => this.collapseDropdown(item.activeNav)}>
                                                    <Link to=""
                                                          onClick={(event) => this.toggleDropdown(item.activeNav, event)}
                                                          className="dropdown-toggle">
                                                        {item.label}
                                                        <i className="fa fa-angle-down"/>
                                                    </Link>
                                                    <ul className="dropdown-menu"
                                                        style={this.getDropdown(item.activeNav)}>
                                                        {
                                                            item.subNavItems.map((subItem, index) => {
                                                                return (
                                                                    <li key={`subItem-${index}`}>
                                                                        {
                                                                            (index !== 0 && index % 4 === 0) ?
                                                                                <li className="divider"/> : ""
                                                                        }
                                                                        <Link to={subItem.link}
                                                                              onClick={(e) => this.activeNav(e, subItem.activeNav)}>
                                                                            {subItem.label}
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </OutsideClick>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li className={this.getNavItemClass(item.activeNav)} key={`item-${index}`}>
                                                <Link to={item.link} onClick={(e) => this.activeNav(e, item.activeNav)}
                                                      className="nav-link link">
                                                    {item.label}
                                                </Link>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                    <div className="icon-bar">
                        <OutsideClick hideDropdown={() => this.collapseDropdown('apps')}>
                            <Link to="#" className={this.getNavItemClass('apps')}
                                  onClick={(event) => this.toggleDropdown('apps', event)}>
                                <i className="fa fa-bell" aria-hidden="true"/>
                                <span>{notifications.length}</span>
                            </Link>
                            <div className="dropdown-content info-dropdown app-switcher-panel"
                                 style={this.getDropdown('apps')}>
                                <NotificationDropDown
                                    notificationItems={notifications}
                                    hubConnection={this.props.hubConnection}
                                />
                            </div>
                        </OutsideClick>
                        <OutsideClick hideDropdown={() => this.collapseDropdown('profile')}>
                            <Link to="#" className={this.getNavItemClass('profile')}
                                  onClick={(event) => this.toggleDropdown('profile', event)}>
                                {
                                    this.getUserImage('small')
                                }
                            </Link>
                            <div id="dropdown1" className="dropdown-content info-dropdown"
                                 style={this.getDropdown('profile')}>
                                <ul className="dropdown-content-area">
                                    <li className="dropdown-profile-picture">
                                        {
                                            this.getUserImage('large')
                                        }
                                    </li>
                                    <li className="dropdown-details">
                                        <p>
                                            <strong>User name</strong><br/>
                                            {sessionStorage.getItem('currentUser')}<br/>
                                            xxxxxxxxxx
                                        </p>
                                    </li>
                                </ul>
                                <div className="dropdown-profile-role vertical-form">
                                    <div className="form-group">
                                        <label>Role</label>
                                        <select defaultValue={this.state.activeRole}
                                                className="form-control">
                                            <option key="role-11" value={1}>Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="dropdown-button-footer nav-dropdown-footer">
                                    <button type="button" className="button-large button-transparent hidden">View
                                        Profile
                                    </button>
                                    <button type="button" className="button-large button-transparent"
                                            onClick={this.logout}>Logout
                                    </button>
                                </div>
                            </div>
                        </OutsideClick>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;