import Text from "../../../../common/components/Text/Text.tsx";
import {useAuthContext} from "../../../../Contexts/AuthContext.tsx";

function Header() {
    const {user} = useAuthContext();

    return (
        <>
            <Text heading={true}>Hello {user}</Text>
        </>
    )
}

export default Header