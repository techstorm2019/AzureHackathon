import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderItems from "../header/header-items";

class MobileNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNav: false
        }
    }

    toggleMobileNav() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({
            showNav: !this.state.showNav
        });
    }

    getNavClass() {
        return (this.state.showNav) ? "has-sub sub-active close-nav-btn" : "has-sub news";
    }

    toggleSubMenu = (event) => {
        let nodeItem = event.target.parentNode;
        let subItems = null;
        let icon = null;
        if (nodeItem.classList.contains("nav-mobile-title")) {
            subItems = nodeItem.nextSibling;
            icon = nodeItem.childNodes[1];
        } else if (nodeItem.classList.contains("nav-mobile-column")) {
            subItems = nodeItem.childNodes[1];
            icon = nodeItem.firstChild.childNodes[1];
        }

        if (subItems !== null) {
            (subItems.classList.contains("hidden")) ? subItems.classList.remove("hidden") : subItems.classList.add("hidden");
        }

        if (icon !== null) {
            if (icon.classList.contains("fa-chevron-up")) {
                icon.classList.remove("fa-chevron-up");
                icon.classList.add("fa-chevron-down");
            } else if (icon.classList.contains("fa-chevron-down")) {
                icon.classList.remove("fa-chevron-down");
                icon.classList.add("fa-chevron-up");
            }
        }

        event.stopPropagation();
    };

    getNavItemClass = (item) => {
        //console.log(item);
        if(this.props.accessItems.includes(item)){
            return "nav-mobile-column";
        }else {
            return "hidden";
        }
    };

    render() {
        return (
            <nav className="footer-nav mobile-display-gray">
                <ul>
                    <li className={this.getNavClass()} onClick={() => this.toggleMobileNav()}>
                        <ul className="submenu submenu-small">
                            <li className="nav-column-row">
                                {
                                    HeaderItems.map((item, index) => {
                                        if (item.link === "#") {
                                            return (
                                                <div className={this.getNavItemClass(item.activeNav)} key={`item-${index}`}>
                                                    <div className={"nav-mobile-title"}
                                                         onClick={(event) => this.toggleSubMenu(event)}>
                                                        <span>{item.label}</span>
                                                        <i className="fa fa-chevron-up" aria-hidden="true"/>
                                                    </div>
                                                    <ul className={"sub-nav-items"}>
                                                        {
                                                            item.subNavItems.map((subItem, index) => {
                                                                return (
                                                                    <li key={`subItem-${index}`}>
                                                                        <Link to={subItem.link}>{subItem.label}</Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className={this.getNavItemClass(item.activeNav)} key={`item-${index}`}>
                                                    <div className={"nav-mobile-title"}>
                                                        <Link to={item.link}>{item.label}</Link>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default MobileNav;