import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import {
    handleInput,
    loaderSize,
    loaderColor,
    validateEmpty,
} from "../../Utils/FormHelper";
import { reseter, createJob } from "../../Slicer/Jobs";
import { selectAllCategories } from "../../Slicer/Categories";

const JobPost = () => {

    const { status, message } = useSelector((state) => state.jobs);
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        description: "",
        payFrequency: "",
        workHour: "",
        workPattern: "",
        startDate: "",
        categoryId: "",
        endDate: "",
        vancancies: "",
        salary: "",
        jobType: "",
        location: "",
        county: "",
        publishedDate: "",
        expiredDate: "",
        benefit_one: "",
        benefit_two: "",
        benefit_three: "",
        req_one: "",
        req_two: "",
        req_three: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatch = useDispatch();


    //get catgories 
    const categories = useSelector(selectAllCategories);
    const categoriesOption = !categories
        ? ""
        : Array.from(categories)
            .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            .map((category) => {
                return (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                );
            });

    const reset = () => {
        setFormData({
            name: "",
            title: "",
            description: "",
            payFrequency: "",
            workHour: "",
            workPattern: "",
            startDate: "",
            categoryId: "",
            endDate: "",
            vancancies: "",
            salary: "",
            jobType: "",
            location: "",
            county: "",
            publishedDate: "",
            expiredDate: "",
            benefit_one: "",
            benefit_two: "",
            benefit_three: "",
            req_one: "",
            req_two: "",
            req_three: "",
        });
    };

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, dispatch]);

    const handleLogin = (e) => {
        e.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    const dispatchFormData = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
            dispatch(createJob(formData));
            dispatch(reseter());
            setIsSubmit(false);
        }

        if (status === "succeeded" && isSubmit) {
            toast.success("login sucess", { autoClose: 2000 });
            reset();
            dispatch(reseter());
            setIsSubmit(false);
        }
        if (status === "failed") {
            dispatch(reseter());
            toast.error(message, { autoClose: 4000 });
            setIsSubmit(false);
        }
    };
    referal.current = dispatchFormData;
    return (
        <div className="container-fluid p-5">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="white_box mb_30">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="modal-content cs_modal">
                                    <div className="modal-header">
                                        <h5 className="modal-title"> Post Job Application</h5>
                                    </div>
                                    <div className="modal-body ">
                                        <form onSubmit={handleLogin}>
                                            <div className="mb-3">
                                                <label
                                                    className="form-label"
                                                    htmlFor="name"
                                                >
                                                    Name of Job
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    Job Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter job title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    Job Description
                                                </label>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter job description"
                                                    rows={5}
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    Job Pay Frequency
                                                </label>
                                                <select
                                                    class="form-control"
                                                    id="sel1"
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                    name="payFrequency">
                                                    <option key={1} value={"daily"} > daily</option>
                                                    <option key={2} value={"weekly"} > weekly</option>
                                                    <option key={3} value={"monthly"} > monthly</option>
                                                    <option key={4} value={"yearly"} > yearly</option>
                                                </select>
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    Job work Hour
                                                </label>
                                                <select
                                                    class="form-control"
                                                    id="sel1"
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                    name="workHour">
                                                    <option key={1} value={"fulltime"} > fulltime</option>
                                                    <option key={2} value={"partime"} > partime</option>
                                                </select>
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="sel111"
                                                >
                                                    Job Work Pattern
                                                </label>
                                                <select
                                                    class="form-control"
                                                    id="sel111"
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                    name="workPattern">
                                                    <option key={1} value={"morning"} > morning</option>
                                                    <option key={2} value={"day"} > day</option>
                                                    <option key={3} value={"night"} > night</option>
                                                </select>
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="date"
                                                >
                                                    Job Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    className="form-control"
                                                    placeholder="Ex: day/month/year"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="cat"
                                                >
                                                    Job Work Pattern
                                                </label>
                                                <select
                                                    class="form-control"
                                                    id="cat"
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                    name="categoryId">

                                                    <option> select category</option>
                                                    {categoriesOption}
                                                </select>
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="edate"
                                                >
                                                    Job End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="edate"
                                                    className="form-control"
                                                    placeholder="Ex: day/month/year"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="vancancies"
                                                >
                                                    Number of vancancies
                                                </label>
                                                <input
                                                    type="text"
                                                    id="vancancies"
                                                    className="form-control"
                                                    placeholder="Ex: 30"
                                                    name="vancancies"
                                                    value={formData.vancancies}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="salary"
                                                >
                                                    Salary ($)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="salary"
                                                    className="form-control"
                                                    placeholder="Ex: 300"
                                                    name="salary"
                                                    value={formData.salary}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>


                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="typer"
                                                >
                                                    Job Type
                                                </label>
                                                <select
                                                    class="form-control"
                                                    id="typer"
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                    name="jobType">
                                                    <option key={1} value={"temporary"} > temporary</option>
                                                    <option key={2} value={"permanent"} > permanent</option>
                                                </select>
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="location"
                                                >
                                                    Job's Country Location
                                                </label>
                                                <input
                                                    type="text"
                                                    id="location"
                                                    className="form-control"
                                                    placeholder="Ex: United State"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="county"
                                                >
                                                    Job's County (State)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="county"
                                                    className="form-control"
                                                    placeholder="Ex: California"
                                                    name="county"
                                                    value={formData.county}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="pdate"
                                                >
                                                    Job Published Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="pdate"
                                                    className="form-control"
                                                    placeholder="Ex: day/month/year"
                                                    name="publishedDate"
                                                    value={formData.publishedDate}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="pexdate"
                                                >
                                                    Job Expiring Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="pexdate"
                                                    className="form-control"
                                                    placeholder="Ex: day/month/year"
                                                    name="expiredDate"
                                                    value={formData.expiredDate}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>


                                            <div className="mb-3 ">
                                                <h4>Benefit Section</h4>
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="benefit_one"
                                                >
                                                    Benefit (1)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="benefit_one"
                                                    className="form-control"
                                                    placeholder="enter benefit"
                                                    name="benefit_one"
                                                    value={formData.benefit_one}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="benefit_two"
                                                >
                                                    Benefit Optional
                                                </label>
                                                <input
                                                    type="text"
                                                    id="benefit_two"
                                                    className="form-control"
                                                    placeholder="enter benefit"
                                                    name="benefit_two"
                                                    value={formData.benefit_two}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="benefit_three"
                                                >
                                                    Benefit Optional
                                                </label>
                                                <input
                                                    type="text"
                                                    id="benefit_three"
                                                    className="form-control"
                                                    placeholder="enter benefit"
                                                    name="benefit_three"
                                                    value={formData.benefit_three}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <h4>Requirement Section</h4>
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="req_one"
                                                >
                                                    Requirement
                                                </label>
                                                <input
                                                    type="text"
                                                    id="req_one"
                                                    className="form-control"
                                                    placeholder="enter requirement"
                                                    name="req_one"
                                                    value={formData.benfit_three}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="req_two"
                                                >
                                                    Requirement Optional
                                                </label>
                                                <input
                                                    type="text"
                                                    id="req_two"
                                                    className="form-control"
                                                    placeholder="enter requirement"
                                                    name="req_two"
                                                    value={formData.req_two}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>

                                            <div className="mb-3 ">
                                                <label
                                                    className="form-label"
                                                    htmlFor="req_three"
                                                >
                                                    Requirement optional
                                                </label>
                                                <input
                                                    type="text"
                                                    id="req_three"
                                                    className="form-control"
                                                    placeholder="enter requirement"
                                                    name="req_three"
                                                    value={formData.req_three}
                                                    onChange={(e) => handleInput(e, setFormData)}
                                                />
                                            </div>




                                            <div className="row ">
                                                {status === "loading" ? (
                                                    <LineWave
                                                        color={loaderColor}
                                                        height={loaderSize}
                                                        width={loaderSize}
                                                    />
                                                ) : (

                                                    <button type="submit" className="btn_1 full_width text-center">
                                                        LOG-IN
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="border_style">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobPost