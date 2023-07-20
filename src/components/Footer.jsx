const Footer = () => {
        // const [currentDate, setCurrentDate] = useState(new Date());
      
        // const updateDate = () => {
        //   setCurrentDate(new Date());
        // };

        const currentDate = new Date()

    return(
        <div className="flex justify-center w-full bg-accent gap-10 text-sm p-2 italic">
            <p className="text-white opacity-50">Copyright &copy; <a className="no-underline font-bold italic" href="http://twitter.com/gr8qm_" target="_blank" rel="noopener noreferrer">gr8QM</a> </p>

            <p className="text-white opacity-50">All Right Reserved {currentDate.getFullYear()} </p>
        </div>
    )
}

export default Footer