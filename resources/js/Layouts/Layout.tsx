import { Head } from "@inertiajs/react";
import { ReactNode } from "react";
import Footer from "./Footer";
import Modals from "@/Components/Modals";
import Header from "./Header";


interface Props {
    children?: ReactNode,
    /*  hasReferences?: boolean, */
    title?: string
    /*     hasPreFooter?: boolean, */
}

const Layout = (props: Props) => {
    const { children, title } = props;
    // let [open, setOpen] = useState(false)
    return (
        <div className="">
            <Head title={title} />
            <div>
                <Header />
                {children}
                {/* <BrandLoop /> */}
                {/* <StickyBottomNav /> */}
                <Footer />
            </div>
            <Modals />
        </div>
    );
};

export default Layout;
