import LoadingSpinner from "../common/components/LoadingSpinner/LoadingSpinner.tsx";
import Text from "../common/components/Text/Text.tsx";

function Loading() {

    return (
        <>

            <div style={{textAlign: 'center', backgroundColor: '#9B9ECE'}}>

                <Text heading={true}>PowerliftPal </Text>
            </div>

            <LoadingSpinner />
        </>

    )
}

export default Loading;