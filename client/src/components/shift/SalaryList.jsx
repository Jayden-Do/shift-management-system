import React, { useContext, useState, useEffect } from "react";
import { SalaryContext } from "../../contexts/SalaryContext";

const SalaryList = ({ array, code }) => {
    // Context
    const {
        salaryState: { salaries },
        salaryTemp,
        setSalaryTemp,
    } = useContext(SalaryContext);

    const [isCodeInSalariesArray, setIsCodeInSalariesArray] = useState([]);

    const handleClick = (event) => {
        // Get the user ID associated with the clicked element
        const clickedUserId = event.currentTarget.getAttribute("name");

        // Create an object with both clickedUserId and code
        const item = { clickedUserId, code };

        // Check if the object is already in the array
        const isItemInArray = salaryTemp.some(
            (element) => element.clickedUserId === clickedUserId && element.code === code
        );

        // If present, remove it from the array
        if (isItemInArray) {
            setSalaryTemp(
                salaryTemp.filter(
                    (element) => element.clickedUserId !== clickedUserId || element.code !== code
                )
            );
        } else {
            // If not present, add it to the array
            setSalaryTemp([...salaryTemp, item]);
        }

        // Toggle the "marked2" class on the clicked element
        event.target.classList.toggle("marked2");
    };

    useEffect(() => {
        // Calculate isCodeInSalariesArray when salaries or code change
        if (salaries) {
            const newIsCodeInSalariesArray = array.map((user) => {
                return salaries.some((item) => item.timekeeper.some((salary) => salary === code));
            });

            setIsCodeInSalariesArray(newIsCodeInSalariesArray);
        }
    }, [salaries, code, array]);

    return (
        <div>
            <ul className="salary__name-list">
                {array.map((user, index) => {
                    const isCodeInSalaries = isCodeInSalariesArray[index];

                    return (
                        <li
                            key={index}
                            onClick={handleClick}
                            name={user.userId}
                            className={isCodeInSalaries ? "config-disable" : ""}
                        >
                            {user.username}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SalaryList;
