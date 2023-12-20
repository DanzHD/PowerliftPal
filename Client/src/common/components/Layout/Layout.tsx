import './_layout.scss';
import cx from "classnames";
function Layout({
    header: Header,
    content: Content,
    sideBar: SideBar,
    footer: Footer,
    classNames
}) {

    const computedClassNamesMain = cx('main', classNames);
    const computedClassNamesHeader = cx('header', classNames);
    const computedClassNamesContent = cx('main-content', classNames);
    const computedClassNamesRightSideBar = cx('right-sidebar', classNames);
    const computedClassNamesFooter = cx('footer', classNames);


    return (
        <>
            <div className={computedClassNamesMain}>
                { Header &&
                    <div className={computedClassNamesHeader}>
                        {Header}
                    </div>
                }
                {Content &&
                    <div className={computedClassNamesContent}>

                        {Content}
                    </div>
                }

                {SideBar &&
                    <div className={computedClassNamesRightSideBar}>
                        {SideBar}
                    </div>
                }

                {Footer &&
                    <div className={computedClassNamesFooter}>
                        {Footer}
                    </div>
                }
            </div>

        </>
    )
}

export default Layout