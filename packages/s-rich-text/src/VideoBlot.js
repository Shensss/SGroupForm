const BlockEmbed = Quill.import('blots/block/embed')

class VideoBlot extends BlockEmbed {
    static create(value) {
        let node = super.create()
        node.setAttribute('src', value.url)
        node.setAttribute('controls', value.controls)
        node.setAttribute('width', value.width)
        node.setAttribute('height', value.height)
        node.setAttribute('style', 'display:block;margin:0 auto;')
        node.setAttribute('webkit-playsinline', true)
        node.setAttribute('playsinline', true)
        node.setAttribute('x5-playsinline', true)
        return node;
    }

    static value(node) {
        return {
            url: node.getAttribute('src'),
            controls: node.getAttribute('controls'),
            width: node.getAttribute('width'),
            height: node.getAttribute('height')
        };
    }
}

export default VideoBlot
