import gradio as gr
from gradio_gradioterminal import GradioTerminal, TermInputData
from datetime import datetime

example = GradioTerminal().example_inputs()

with gr.Blocks() as demo:
    terminal1 = GradioTerminal()  # interactive version of your component
    event_output = gr.Textbox()

    # examples=[[example]],  # uncomment this line to view the "example version" of your component

    def send_terminal():
        now = datetime.now() # current date and time
        date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
        value="'\033[2J\033[HHello from \x1B[1;3;31mxterm.js\x1B[0m $ '"+ date_time
        yield value


    z = gr.Button(value="Welcome")

    def send_output(evt: TermInputData):
        print(f"{evt.input}  -  {ord(evt.input)}")
        return evt.input

    z.click(send_terminal,inputs= [], outputs=[terminal1])
    terminal1.input(send_output,inputs=[],outputs=[event_output])

if __name__ == "__main__":
    demo.launch()
