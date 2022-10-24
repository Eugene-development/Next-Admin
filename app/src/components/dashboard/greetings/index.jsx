const Greetings = ({name}) => {
    return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            {name}, вы успешно авторизовались.
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Greetings
