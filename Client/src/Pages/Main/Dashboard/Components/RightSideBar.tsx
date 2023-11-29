import Text from "../../../../common/components/Text/Text.tsx";
import '../_dashboard.scss'
import '../../../../Styles/_vars.scss'
import {useEffect, useState} from "react";
import {useAPIContext} from "../../../../Contexts/APIContext.tsx";

function RightSideBar() {

    const {weeklyWorkouts, weeklyLiftWeight} = useAPIContext();

    return (
        <>
            <div className='sidebar-grid'>
                <div className='sidebar heading'>

                    <Text centered='centered' subheading={true}>This Week</Text>
                </div>

                <div className='sidebar content'>
                    <div className='sidebar-item'>
                        <Text styles={{fontSize: '20px', fontWeight: '500'}}>Workouts: </Text>
                        <Text styles={{fontSize: '20px', fontWeight: '500'}}><b>{weeklyWorkouts} </b></Text>
                    </div>
                    <div className='sidebar-item'>
                        <Text styles={{fontSize: '20px', fontWeight: '500'}}>Lifted: </Text>
                        <Text styles={{fontSize: '20px', fontWeight: '500'}}><b>{weeklyLiftWeight}kg</b></Text>
                    </div>


                </div>
            </div>

        </>
    )
}

export default RightSideBar;